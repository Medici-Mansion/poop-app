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
import { signUp, login as signIn, setAccessToken, getMe } from "@/apis";
import { Schema } from "@/store/state/persisted/schema";

export function getInitialState(persistedUser: SessionAccount): State {
  return {
    profile: persistedUser,
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
  resumeSession: async () => {},
  removeAccount: () => {},
});

export type Action =
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
      syncedUser: SessionAccount;
      syncedProfile?: SessionProfile;
    };

export type State = {
  readonly user?: SessionAccount;
  readonly profile?: SessionProfile;
  needsPersist: boolean;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "create-profile":
    case "logged-out":
    case "removed-account":
    case "store-token":
    case "switched-to-account":
    case "switched-to-profile":
    case "synced-accounts":
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

  const persist = useCallback((values: Schema) => {
    persisted.get("session");
  }, []);
  // persisted
  const createAccount = React.useCallback<SessionApiContext["createAccount"]>(
    async (params) => {
      logger.log("CREATE ACCOUNT");
      const signal = cancelPendingTask();
      track("Try Create Account");
      logger.log("account:create:begin", {});
      const account = await signUp(params);
      account.body.data;
      if (signal.aborted) {
        return;
      }
      dispatch({
        type: "switched-to-account",
        user: account,
      });
      track("Create Account");
      logger.log("account:create:success", {});
    },
    [cancelPendingTask],
  );

  const login = React.useCallback<SessionApiContext["login"]>(
    async (params) => {
      const signal = cancelPendingTask();

      const { accessToken } = await signIn({
        id: params.userId,
        password: params.password,
      });

      await setAccessToken({ accessToken, shouldRefresh: true });
      const { body: user } = await getMe();
      if (signal.aborted) {
        return;
      }
      dispatch({
        type: "switched-to-account",
        user,
      });
      track("Sign In");
    },
    [cancelPendingTask],
  );

  const logout = React.useCallback<SessionApiContext["logout"]>(() => {
    // addSessionDebugLog({ type: "method:start", method: "logout" });
    // cancelPendingTask();
    // dispatch({
    //   type: "logged-out",
    // });
    // logEvent("account:loggedOut", { logContext });
    // addSessionDebugLog({ type: "method:end", method: "logout" });
  }, [cancelPendingTask]);

  const resumeSession = React.useCallback<SessionApiContext["resumeSession"]>(
    async (storedAccount) => {
      const signal = cancelPendingTask();
      // const { agent, account } = await createAgentAndResume(
      //   storedAccount,
      //   onAgentSessionChange,
      // );

      // if (signal.aborted) {
      //   return;
      // }
      // dispatch({
      //   type: "switched-to-account",
      //   newAgent: agent,
      //   newAccount: account,
      // });
      // addSessionDebugLog({
      //   type: "method:end",
      //   method: "resumeSession",
      //   account,
      // });
    },
    [cancelPendingTask],
  );

  const removeAccount = React.useCallback<SessionApiContext["removeAccount"]>(
    (account) => {
      // addSessionDebugLog({
      //   type: "method:start",
      //   method: "removeAccount",
      //   account,
      // });
      // cancelPendingTask();
      // dispatch({
      //   type: "removed-account",
      //   accountDid: account.did,
      // });
      // addSessionDebugLog({
      //   type: "method:end",
      //   method: "removeAccount",
      //   account,
      // });
    },
    [cancelPendingTask],
  );

  // React.useEffect(() => {
  //   if (state.needsPersist) {
  //     state.needsPersist = false;
  //     const persistedData = {
  //       accounts: state.accounts,
  //       currentAccount: state.accounts.find(
  //         (a) => a.did === state.currentAgentState.did,
  //       ),
  //     };
  //     addSessionDebugLog({ type: "persisted:broadcast", data: persistedData });
  //     persisted.write("session", persistedData);
  //   }
  // }, [state]);

  React.useEffect(() => {
    return persisted.onUpdate(() => {
      const synced = persisted.get("session");
      logger.info("persisted:receive");
      dispatch({
        type: "synced-accounts",
        syncedUser: synced.user,
        syncedProfile: synced.profile,
      });

      resumeSession(synced.user);
    });
  }, [state, resumeSession]);

  const stateContext = React.useMemo<SessionStateContext>(
    () => ({
      user: state.user,
      profile: state.profile,
      hasSession: !!state.user,
    }),
    [state],
  );

  const api = React.useMemo(
    () => ({
      createAccount,
      login,
      logout,
      resumeSession,
      removeAccount,
    }),
    [createAccount, login, logout, resumeSession, removeAccount],
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
