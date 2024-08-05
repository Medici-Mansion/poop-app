import React, { useCallback } from "react";
import * as persisted from "@/store/state/persisted";
import {
  SessionStateContext,
  SessionApiContext,
  SessionAccount,
  SessionProfile,
} from "@/store/state/session/types";
import { track } from "@/lib/analytics/analytics";
import { logger } from "@/lib/logger";
import {
  signUp,
  login as signIn,
  setAccessToken,
  getMe,
  socialSignup,
  getMyProfileList,
  getLatestProfile,
} from "@/apis";
import { Schema } from "@/store/state/persisted/schema";
import { isEmpty } from "@/lib/utils";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";

export function getInitialState(persistedUser: Schema["session"]): State {
  return {
    user: persistedUser.user,
    profile: persistedUser.profile,
    needsPersist: false,
  };
}

const StateContext = React.createContext<SessionStateContext>({
  user: undefined,
  profile: undefined,
  hasSession: false,
});

const ApiContext = React.createContext<SessionApiContext>({
  createAccount: async () => {},
  login: async () => {},
  logout: async () => {},
  removeAccount: () => {},
  refresh: async () => {},
});

export type Action =
  | {
      type: "request-verify-code";
    }
  | {
      type: "switched-to-account";
      user: SessionAccount;
    }
  | {
      type: "removed-account";
      userId: string;
    }
  | {
      type: "logged-out";
    }
  | {
      type: "switched-to-profile";
      profile: SessionProfile;
    }
  | {
      type: "create-profile";
    }
  | {
      type: "store-token";
      token: string;
    }
  | {
      type: "synced-accounts";
      syncedUser?: SessionAccount | null;
      syncedProfile?: SessionProfile | null;
    };

export type State = {
  readonly user?: SessionAccount | null;
  readonly profile?: SessionProfile | null;
  needsPersist: boolean;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "switched-to-account":
      const { user } = action;
      return {
        needsPersist: true,
        user,
      };
    case "synced-accounts":
      const { syncedProfile, syncedUser } = action;
      return {
        user: syncedUser,
        profile: syncedProfile,
        needsPersist: false,
      };
    case "create-profile":
    case "logged-out":
    case "removed-account":
    case "store-token":
    case "switched-to-profile":
      break;
  }
  return state;
};

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const cancelPendingTask = useOneTaskAtATime();
  const [state, dispatch] = React.useReducer(reducer, null, () => {
    const initialState = getInitialState(persisted.get("session"));
    return initialState;
  });
  console.log(state, "<<state");

  const createAccount = React.useCallback<SessionApiContext["createAccount"]>(
    async (params) => {
      logger.log("CREATE ACCOUNT");
      const signal = cancelPendingTask();
      track("Try Create Account");
      logger.log("account:create:begin", {});
      const account = await signUp(params);

      if (signal.aborted) {
        return;
      }
      dispatch({
        type: "request-verify-code",
      });
      track("Create Account");
      logger.log("account:create:success", {});
    },
    [cancelPendingTask]
  );

  const login = React.useCallback<SessionApiContext["login"]>(
    async (params) => {
      const signal = cancelPendingTask();
      let accessToken = "";
      try {
        switch (params.type) {
          case "SOCIAL":
            const { provider } = params;
            switch (provider) {
              case "APPLE":
                const credential = await AppleAuthentication.signInAsync({
                  nonce: "123123123",
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });

                const { accessToken: socialAccessToken } = await socialSignup({
                  provider,
                  token: credential.identityToken!,
                });
                accessToken = socialAccessToken;

                // signed in

                break;
              case "GOOGLE":
                break;
            }
            break;
          case "credential":
            const { accessToken: credentialToken } = await signIn({
              id: params.userId,
              password: params.password,
            });
            accessToken = credentialToken;
        }

        await setAccessToken({ accessToken, shouldRefresh: false });
        const { body: user } = await getMe();
        const response = await getMyProfileList();

        if (!response.body.length) {
          router.replace("/profile/main");
        } else {
          router.replace("/profile-select");
        }

        if (signal.aborted) {
          return;
        }

        dispatch({
          type: "switched-to-account",
          user,
        });
        track("Sign In");
      } catch (e) {
        console.log(e, "<<<ee");
        if (e.code === "ERR_REQUEST_CANCELED") {
          // handle that the user canceled the sign-in flow
        } else {
          // handle other errors
        }
      }
    },
    [cancelPendingTask]
  );

  const logout = React.useCallback<SessionApiContext["logout"]>(() => {}, [
    cancelPendingTask,
  ]);

  const refresh = React.useCallback<SessionApiContext["refresh"]>(
    async (token) => {
      logger.info("refresh");
      const signal = cancelPendingTask();
      await setAccessToken({ accessToken: token, shouldRefresh: true });
      const { body: user } = await getMe();
      const { body: latestProfile } = await getLatestProfile();
      logger.info("refresh DONE", { type: "debug" });

      if (signal.aborted) {
        return;
      }

      logger.info("synced-accounts", { type: "debug" });
      dispatch({
        type: "synced-accounts",
        syncedUser: user,
        syncedProfile: latestProfile,
      });
    },
    [cancelPendingTask]
  );

  const removeAccount = React.useCallback<SessionApiContext["removeAccount"]>(
    (account) => {},
    [cancelPendingTask]
  );

  React.useEffect(() => {
    if (state.needsPersist) {
      state.needsPersist = false;
      const persistedData = {
        user: state.user,
        profile: state.profile,
        token: persisted.get("session").token,
      };
      logger.info("persisted:broadcast");
      persisted.write("session", persistedData);
    }
  }, [state]);

  React.useEffect(() => {
    return persisted.onUpdate(() => {
      const synced = persisted.get("session");
      logger.info("persisted:receive");
      dispatch({
        type: "synced-accounts",
        syncedUser: synced.user,
        syncedProfile: synced.profile,
      });
    });
  }, [state]);

  const stateContext = React.useMemo<SessionStateContext>(
    () => ({
      user: state.user,
      profile: state.profile,
      hasSession: !isEmpty(state.user),
    }),
    [state]
  );

  const api = React.useMemo(
    () => ({
      createAccount,
      login,
      logout,
      removeAccount,
      refresh,
    }),
    [createAccount, login, logout, removeAccount]
  );

  return (
    <StateContext.Provider value={stateContext}>
      <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
    </StateContext.Provider>
  );
}

function useOneTaskAtATime() {
  const abortController = React.useRef<AbortController | null>(null);
  const cancelPendingTask = React.useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    return abortController.current.signal;
  }, []);
  return cancelPendingTask;
}

export function useSession() {
  return React.useContext(StateContext);
}

export function useSessionApi() {
  return React.useContext(ApiContext);
}
