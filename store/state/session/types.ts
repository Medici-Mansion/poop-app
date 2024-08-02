import { SocialProvider } from "@/types";
import { PersistedAccount, PersistedProfile } from "../persisted/schema";

export type SessionAccount = PersistedAccount;
export type SessionProfile = PersistedProfile;

export type SessionStateContext = {
  user?: SessionAccount | null;
  profile?: SessionProfile | null;
  hasSession: boolean;
};

export type LoginProps =
  | { type: "credential"; userId: string; password: string }
  | { type: "SOCIAL"; provider: SocialProvider };

export type SessionApiContext = {
  createAccount: (props: {
    userId: string;
    password: string;
    birthday?: string;
    phone?: string;
  }) => Promise<void>;
  login: (props: LoginProps) => Promise<void>;
  /**
   * A full logout. Clears the `currentAccount` from session, AND removes
   * access tokens from all accounts, so that returning as any user will
   * require a full login.
   */
  logout: () => void;
  removeAccount: (account: SessionAccount) => void;
  refresh: (token: string) => Promise<void>;
};
