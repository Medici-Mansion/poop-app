import { UploadButton } from ".../../components/upload-icon";
import { Community, Home, HomeActive, Profile, Search } from "@/assets/icons";
import { PickedImage } from "@/types";
import { Stack, Tabs } from "expo-router";
import React, { createContext, useState } from "react";
import { StickerProvider } from "../../components/skia/StickerContext";

interface ToonContextType {
  images: PickedImage[];
  setImages: (images: PickedImage[]) => void;
}

export const ToonContext = createContext<ToonContextType>({
  images: [],
  setImages() {},
});

export const useToonImage = () => {
  return React.useContext(ToonContext);
};

export default function TabLayout() {
  const [images, setImages] = useState<PickedImage[]>([]);
  return (
    <StickerProvider>
      <ToonContext.Provider value={{ images, setImages }}>
        <Stack
          initialRouteName="(tabs)"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="make-toon" />
        </Stack>
      </ToonContext.Provider>
    </StickerProvider>
  );
}
