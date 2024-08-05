import QueryProvider from "../providers/query-provider";
import { Redirect, router, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { ThemeProvider } from "@/providers/theme-provider";
import {
  Provider as SessionProvider,
  useSession,
  useSessionApi,
} from "@/providers/session-provider";
import { Pressable, Text, View } from "react-native";
import { Splash } from "@/providers/splash-provider";
import * as bootstrap from "@/bootstrap";
import { getToken } from "@/apis";
import { read } from "@/store/state/persisted/store";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "sign-in",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SessionProvider>
        <RootNavigation />
      </SessionProvider>
    </SafeAreaProvider>
  );
}

function RootNavigation() {
  const [isReady, setIsReady] = useState(false);
  const { refresh } = useSessionApi();

  useEffect(() => {
    const handleInit = async () => {
      try {
        const token = await getToken();
        // await bootstrap.init();
        if (token) {
          await refresh(token);
        }
      } catch {
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };
    handleInit();
  }, []);

  if (!isReady)
    return (
      <View>
        <Text>?!?!?!?</Text>
      </View>
    );

  return (
    <Splash isReady={isReady}>
      <ThemeProvider>
        <GestureHandlerRootView>
          <QueryProvider>
            <Host>
              <Stack
                screenOptions={{
                  headerShown: false,

                  contentStyle: {
                    backgroundColor: "#121212",
                  },
                }}
                initialRouteName="sign-in"
              >
                <Stack.Screen name="index" />
                <Stack.Screen
                  name="sign-in"
                  options={{
                    animation: "fade_from_bottom",
                  }}
                />
                <Stack.Screen name="sign-up" />

                <Stack.Screen name="(auth)" />
                <Stack.Screen name="my-profile" />
                <Stack.Screen name="select-photo" />
              </Stack>
            </Host>
          </QueryProvider>
          <Pressable
            className="w-4 h-4 bg-blue-300 absolute right-10 bottom-10 z-30"
            onPress={() => {
              router.navigate("/_sitemap");
            }}
          />
          <Pressable
            className="w-4 h-4 bg-red-300 absolute right-14 bottom-10 z-30"
            onPress={async () => {
              console.log(await read());
            }}
          />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Splash>
  );
}
