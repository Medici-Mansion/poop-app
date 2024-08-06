import { StickerProvider } from "@/components/skia/StickerContext";
import { ToonProvider } from "@/providers/toon-provider";
import { Stack } from "expo-router";

export default function CreateProfileLayout() {
  return (
    <StickerProvider>
      <ToonProvider>
        <Stack
          initialRouteName="main"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="main" />
          <Stack.Screen name="create" />
        </Stack>
      </ToonProvider>
    </StickerProvider>
  );
}
