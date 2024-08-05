import { useNavigation } from "@react-navigation/native";
import {
  Canvas,
  useImage,
  useCanvasRef,
  rect,
  processTransform2d,
  fitbox,
  SkRect,
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { Dimensions, Share, View } from "react-native";

import { ModalButton } from "@/components/skia/ModalButton";
import { ShareButton } from "@/components/skia/ShareButton";
import { useStickerContext } from "@/components/skia/StickerContext";
import { GestureHandler } from "@/components/skia/GestureHandler";
import { router } from "expo-router";
import { Picture } from "@/components/skia/Picture";
import { deflate } from "./StickerModal";
import { makeMutable } from "react-native-reanimated";
import { useToonImage } from "@/providers/toon-provider";
const window = Dimensions.get("window");
const iconSize = 64;

const inflate = (rct: SkRect, amount: number) =>
  rect(
    rct.x - amount,
    rct.y - amount,
    rct.width + amount * 2,
    rct.height + amount * 2
  );

export default function MakeToon() {
  const ref = useCanvasRef();
  const { images } = useToonImage();
  const { stickers } = useStickerContext();

  const imagesPars = useMemo(
    () =>
      images.map((i) => {
        const src = rect(0, 0, i.width, i.height);
        const dst = deflate(rect(0, 0, window.width, window.height), 24);
        const m3 = processTransform2d(fitbox("contain", src, dst));
        const matrix = makeMutable(m3);
        const bounds = inflate(src, i.size / 2);
        const size = {
          width: bounds.width,
          height: bounds.height,
        };
        return {
          matrix: matrix,
          width: i.width,
          height: i.height,
          image: i.path,
          size: size,
        };
      }),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }} ref={ref}>
        {imagesPars.map((image) => {
          const i = useImage(image.image);
          return <Picture matrix={image.matrix} key={image.image} image={i!} />;
        })}

        {stickers.map(({ Sticker, matrix }, index) => {
          return <Sticker key={index} matrix={matrix} />;
        })}
      </Canvas>
      {imagesPars.map(({ matrix, image, size }) => (
        <GestureHandler key={image} matrix={matrix} size={size} />
      ))}
      {stickers.map(({ size, matrix }, index) => {
        return <GestureHandler key={index} matrix={matrix} size={size} />;
      })}
      <ModalButton
        size={iconSize}
        onPress={() => router.push("/(auth)/make-toon/StickerModal")}
      />
      <ShareButton
        size={iconSize}
        onPress={() => {
          const img = ref.current!.makeImageSnapshot().encodeToBase64();
          const data = `data:image/png;base64,${img}`;
          Share.share({ url: data });
        }}
      />
    </View>
  );
}
