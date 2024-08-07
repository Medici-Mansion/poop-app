import {
  Skia,
  type SkMatrix,
  type SkSize,
  vec,
} from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  rotateZ,
  scale,
  toM4,
  translate,
} from "../../lib/utils/skia/MatrixHelpers";
interface GestureHandlerProps {
  matrix: SharedValue<SkMatrix>;
  size: SkSize;
  debug?: boolean;
}

const extractTransformations = (matrix: SharedValue<SkMatrix>) => {
  const values = matrix.value.get();
  const [m11, m12, m13, m21, m22, m23] = values;

  const scaleX = Math.sqrt(m11 * m11 + m21 * m21);
  const scaleY = Math.sqrt(m12 * m12 + m22 * m22);
  const rotation = Math.atan2(m21, m11);
  const translate_x = m13;
  const translate_y = m23;

  return {
    rotation,
    scale: (scaleX + scaleY) / 2,
    translate_x,
    translate_y,
  };
};

export const GestureHandler = ({ matrix, size }: GestureHandlerProps) => {
  const pivot = useSharedValue(Skia.Point(1, 1));
  const offset = useSharedValue(Skia.Matrix());

  const pan = Gesture.Pan().onChange((event) => {
    matrix.value = translate(matrix.value, event.changeX, event.changeY);
    const values = matrix.value.get();
    const [m11, m12, m13, m21, m22, m23] = values;

    // const scaleX = Math.sqrt(m11 * m11 + m21 * m21);
    // const scaleY = Math.sqrt(m12 * m12 + m22 * m22);
    // const rotation = Math.atan2(m21, m11);
    // const translate_x = m13;
    // const translate_y = m23;
  });

  const pinch = Gesture.Pinch()
    .onBegin((event) => {
      console.log(event);
      offset.value = matrix.value;
      pivot.value = vec(event.focalX, event.focalY);
    })
    .onChange((event) => {
      matrix.value = scale(offset.value, event.scale, pivot.value);
    });

  const rotate = Gesture.Rotation()
    .onBegin((event) => {
      offset.value = matrix.value;
      pivot.value = vec(event.anchorX, event.anchorY);
    })
    .onChange((event) => {
      matrix.value = rotateZ(offset.value, event.rotation, pivot.value);
    });
  const gesture = Gesture.Race(pan, pinch, rotate);
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    width: size.width,
    height: size.height,
    top: 0,
    left: 0,
    transform: [
      {
        translateX: -size.width / 2,
      },
      {
        translateY: -size.height / 2,
      },
      { matrix: toM4(matrix.value) },
      {
        translateX: size.width / 2,
      },
      {
        translateY: size.height / 2,
      },
    ],
  }));
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
