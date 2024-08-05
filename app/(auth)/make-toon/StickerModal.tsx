import type { FC } from "react";
import React, { useCallback, useMemo } from "react";
import type { SkSize, SkRect } from "@shopify/react-native-skia";
import {
  Canvas,
  Group,
  Skia,
  fitbox,
  rect,
  processTransform2d,
} from "@shopify/react-native-skia";
import { Dimensions, Image, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { makeMutable } from "react-native-reanimated";

import { stickers } from "@/assets/stickers";
import { useStickerContext } from "@/components/skia/StickerContext";
import type { StickerProps } from "@/assets/stickers/Sticker";
import { useQuery } from "@tanstack/react-query";
import { getGraphics, GraphicType } from "@/apis";

export const deflate = (rct: SkRect, amount: number) =>
  rect(
    rct.x + amount,
    rct.y + amount,
    rct.width - amount * 2,
    rct.height - amount * 2
  );

const inflate = (rct: SkRect, amount: number) =>
  rect(
    rct.x - amount,
    rct.y - amount,
    rct.width + amount * 2,
    rct.height + amount * 2
  );

const window = Dimensions.get("window");
const COLS = 2;
const tileWidth = window.width / COLS;
const tileHeight = 125;

const getImageSize = (uri: string) =>
  new Promise<{ width: number; height: number }>((resolve) => {
    Image.getSize(uri, (width, height) => {
      resolve({ width, height });
    });
  });

export default function StickerModal() {
  const { addSticker } = useStickerContext();
  const navigation = useNavigation();
  const onPress = useCallback(
    (Sticker: FC<StickerProps>, size: SkSize) => {
      const src = rect(0, 0, size.width, size.height);
      const dst = deflate(rect(0, 0, window.width, window.height), 24);
      const m3 = processTransform2d(fitbox("contain", src, dst));
      const matrix = makeMutable(m3);
      addSticker({
        Sticker,
        size,
        matrix,
      });
      navigation.goBack();
    },
    [addSticker, navigation]
  );

  const { data } = useQuery({
    queryKey: ["sticker"],
    queryFn: () =>
      getGraphics({ page: 1, pageSize: 30, graphicType: GraphicType.GIF }),
    async select(data) {
      const promises = data.body.list.map(async (item) => {
        const { width, height } = await getImageSize(item.url);

        const src = rect(0, 0, width, height);

        const dst = deflate(rect(0, 0, window.width, window.height), 24);
        const m3 = processTransform2d(fitbox("contain", src, dst));
        console.log(
          {
            width: width,
            height: height,
            image: item.url,
          },
          `
            size: size,
            

          `
        );
        const matrix = makeMutable(m3);

        const bounds = inflate(src, 150 / 2);
        const size = {
          width: bounds.width,
          height: bounds.height,
        };
        return {
          matrix: matrix,
          width: width,
          height: height,
          image: item.url,
          size: size,
        };
      });
      console.log("?!?!?!?!?", promises, "<<promises");

      const iamges = await Promise.all(promises);
      console.log(iamges, "<<iamges");
      return iamges;
    },
  });

  console.log(data, "<<<<datadatadata");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(34, 33, 33)",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {stickers.map(({ Sticker, size }, index) => {
        const { width, height } = size;
        const src = rect(0, 0, width, height);
        const dst = deflate(rect(0, 0, tileWidth, tileHeight), 12);
        const transform = fitbox("contain", src, dst);
        return (
          <Pressable key={index} onPress={onPress.bind(null, Sticker, size)}>
            <Canvas style={{ width: tileWidth, height: tileHeight }}>
              <Group transform={transform}>
                <Sticker matrix={Skia.Matrix()} />
              </Group>
            </Canvas>
          </Pressable>
        );
      })}
    </View>
  );
}
