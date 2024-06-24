import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import QueryProvider from "@/providers/query-provider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      </Stack>
    </QueryProvider>
  );
}
