import { useSession } from "@/providers/session-provider";
import { Redirect } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/sign-in",
};

export default function IndexPage() {
  const { hasSession } = useSession();
  if (hasSession) return <Redirect href="/(auth)/(tabs)/home" />;
  return <Redirect href="/sign-in" />;
}
