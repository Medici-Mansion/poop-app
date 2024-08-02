import * as persisted from "@/store/state/persisted";
export const readLastSessionToken = async () => {
  const { token } = persisted.get("session");
  return token;
};
