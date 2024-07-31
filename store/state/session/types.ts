import { PersistedAccount, PersistedProfile } from "../persisted/schema";

export type SessionAccount = PersistedAccount;
export type SessionProfile = PersistedProfile;

export type SessionStateContext = {
  user?: SessionAccount;
  profile?: SessionProfile | undefined;
  hasSession: boolean;
};

export type SessionApiContext = {
  createAccount: (props: {
    userId: string;
    password: string;
    birthday?: string;
    phone?: string;
  }) => Promise<void>;
  login: (props: { userId: string; password: string }) => Promise<void>;
  /**
   * A full logout. Clears the `currentAccount` from session, AND removes
   * access tokens from all accounts, so that returning as any user will
   * require a full login.
   */
  logout: () => void;
  resumeSession: (account: SessionAccount) => Promise<void>;
  removeAccount: (account: SessionAccount) => void;
};
