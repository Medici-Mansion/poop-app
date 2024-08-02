import { StickerProvider } from "@/components/skia/StickerContext";
import { ToonProvider } from "@/providers/toon-provider";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <StickerProvider>
      <ToonProvider>
        <Stack
          initialRouteName="(tabs)"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="make-toon" />
        </Stack>
      </ToonProvider>
    </StickerProvider>
  );
}
