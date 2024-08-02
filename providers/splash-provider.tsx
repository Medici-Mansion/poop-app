import React, { useCallback, useEffect } from "react";
import {
  AccessibilityInfo,
  Image as RNImage,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { G, Path, SvgProps } from "react-native-svg";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import MaskedView from "@react-native-masked-view/masked-view";

import { Logotype } from "@/assets/icons/logo";
import { isAndroid } from "@/constants/platform/detection";

import splashBackground from "@/assets/images/splash.png";

const splashImageUri = RNImage.resolveAssetSource(splashBackground).uri;

export const Logo = React.forwardRef(function LogoImpl(props: SvgProps, ref) {
  const width = 1000;
  const height = width * (58 / 64);
  return (
    <Svg
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      viewBox="0 0 58 64"
      style={[{ width, height }, props.style]}
    >
      <G>
        <Path
          fill={props.fill || "#fff"}
          d="M55.8848 34.9201C55.4348 28.9001 52.8048 23.5451 48.7948 19.5201V14.7301C48.7948 7.81008 43.1848 2.20508 36.2698 2.20508C31.2098 2.20508 26.8548 5.20508 24.8798 9.52008C21.9548 6.71508 17.8048 5.25508 13.4848 5.92008C6.11976 7.05508 1.07476 13.9451 2.20976 21.3051L4.32476 35.0301L2.57476 60.0301L14.4548 56.7401C19.2898 60.2951 25.4448 62.2151 31.9998 61.7201C46.2198 60.6551 56.9148 48.6551 55.8848 34.9201Z"
        />
        <Path
          fill="black"
          d="M29.9998 63.2952C24.3248 63.2952 18.7898 61.5852 14.1648 58.3752L0.929831 62.0402L2.81483 35.0902L0.724831 21.5302C0.114831 17.5752 1.07983 13.6152 3.44983 10.3852C5.81983 7.15519 9.29983 5.04019 13.2548 4.43019C17.2598 3.81019 21.2398 4.8102 24.4398 7.1852C26.9948 3.1902 31.4498 0.700195 36.2648 0.700195C43.9998 0.700195 50.2898 6.99019 50.2898 14.7252V18.9052C54.4198 23.2552 56.9298 28.8802 57.3748 34.8052C57.9048 41.8602 55.5598 48.7002 50.7748 54.0652C46.0048 59.4202 39.3748 62.6652 32.1048 63.2102C31.3998 63.2652 30.6948 63.2902 29.9948 63.2902L29.9998 63.2952ZM14.7548 55.1002L15.3398 55.5302C20.0698 59.0052 25.9398 60.6702 31.8848 60.2252C38.3748 59.7402 44.2848 56.8452 48.5398 52.0752C52.7798 47.3202 54.8548 41.2702 54.3898 35.0352C53.9848 29.6152 51.6198 24.4852 47.7348 20.5802L47.2998 20.1402V14.7302C47.2998 8.65019 42.3548 3.70519 36.2748 3.70519C31.9748 3.70519 28.0398 6.23519 26.2498 10.1452L25.3698 12.0602L23.8498 10.6002C21.1298 7.99519 17.4398 6.8302 13.7248 7.4002C10.5598 7.8902 7.77483 9.58019 5.87983 12.1602C3.98483 14.7452 3.21483 17.9102 3.69983 21.0752L5.83983 34.9652L5.82983 35.1302L4.22983 58.0152L14.7648 55.1002H14.7548Z"
        />
        <Path
          d="M29.9998 63.2952C24.3248 63.2952 18.7898 61.5852 14.1648 58.3752L0.929831 62.0402L2.81483 35.0902L0.724831 21.5302C0.114831 17.5752 1.07983 13.6152 3.44983 10.3852C5.81983 7.15519 9.29983 5.04019 13.2548 4.43019C17.2598 3.81019 21.2398 4.8102 24.4398 7.1852C26.9948 3.1902 31.4498 0.700195 36.2648 0.700195C43.9998 0.700195 50.2898 6.99019 50.2898 14.7252V18.9052C54.4198 23.2552 56.9298 28.8802 57.3748 34.8052C57.9048 41.8602 55.5598 48.7002 50.7748 54.0652C46.0048 59.4202 39.3748 62.6652 32.1048 63.2102C31.3998 63.2652 30.6948 63.2902 29.9948 63.2902L29.9998 63.2952ZM14.7548 55.1002L15.3398 55.5302C20.0698 59.0052 25.9398 60.6702 31.8848 60.2252C38.3748 59.7402 44.2848 56.8452 48.5398 52.0752C52.7798 47.3202 54.8548 41.2702 54.3898 35.0352C53.9848 29.6152 51.6198 24.4852 47.7348 20.5802L47.2998 20.1402V14.7302C47.2998 8.65019 42.3548 3.70519 36.2748 3.70519C31.9748 3.70519 28.0398 6.23519 26.2498 10.1452L25.3698 12.0602L23.8498 10.6002C21.1298 7.99519 17.4398 6.8302 13.7248 7.4002C10.5598 7.8902 7.77483 9.58019 5.87983 12.1602C3.98483 14.7452 3.21483 17.9102 3.69983 21.0752L5.83983 34.9652L5.82983 35.1302L4.22983 58.0152L14.7648 55.1002H14.7548Z"
          fill="black"
        />
        <Path
          d="M27.4151 34.2657C28.2904 34.2657 29.0001 33.5561 29.0001 32.6807C29.0001 31.8053 28.2904 31.0957 27.4151 31.0957C26.5397 31.0957 25.8301 31.8053 25.8301 32.6807C25.8301 33.5561 26.5397 34.2657 27.4151 34.2657Z"
          fill="black"
        />
        <Path
          d="M35.7549 33.1553C36.6303 33.1553 37.3399 32.4457 37.3399 31.5704C37.3399 30.695 36.6303 29.9854 35.7549 29.9854C34.8795 29.9854 34.1699 30.695 34.1699 31.5704C34.1699 32.4457 34.8795 33.1553 35.7549 33.1553Z"
          fill="black"
        />
      </G>
    </Svg>
  );
});

type Props = {
  isReady: boolean;
};

const AnimatedLogo = Animated.createAnimatedComponent(Logo);

export function Splash(props: React.PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();
  const intro = useSharedValue(0);
  const outroLogo = useSharedValue(0);
  const outroApp = useSharedValue(0);
  const outroAppOpacity = useSharedValue(0);
  const [isAnimationComplete, setIsAnimationComplete] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [isLayoutReady, setIsLayoutReady] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState<boolean | undefined>(
    false
  );
  const isReady =
    props.isReady &&
    isImageLoaded &&
    isLayoutReady &&
    reduceMotion !== undefined;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const logoAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(intro.value, [0, 1], [0.8, 1], "clamp"),
        },
        {
          scale: interpolate(
            outroLogo.value,
            [0, 0.08, 1],
            [1, 0.8, 500],
            "clamp"
          ),
        },
      ],
      opacity: interpolate(intro.value, [0, 1], [0, 1], "clamp"),
    };
  });
  const bottomLogoAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(intro.value, [0, 1], [0, 1], "clamp"),
    };
  });
  const reducedLogoAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(intro.value, [0, 1], [0.8, 1], "clamp"),
        },
      ],
      opacity: interpolate(intro.value, [0, 1], [0, 1], "clamp"),
    };
  });

  const logoWrapperAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        outroAppOpacity.value,
        [0, 0.1, 0.2, 1],
        [1, 1, 0, 0],
        "clamp"
      ),
    };
  });

  const appAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(outroApp.value, [0, 1], [1.1, 1], "clamp"),
        },
      ],
      opacity: interpolate(
        outroAppOpacity.value,
        [0, 0.1, 0.2, 1],
        [0, 0, 1, 1],
        "clamp"
      ),
    };
  });

  const onFinish = useCallback(() => setIsAnimationComplete(true), []);
  const onLayout = useCallback(() => setIsLayoutReady(true), []);
  const onLoadEnd = useCallback(() => setIsImageLoaded(true), []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
        .then(() => {
          intro.value = withTiming(
            1,
            { duration: 400, easing: Easing.out(Easing.cubic) },
            async () => {
              // set these values to check animation at specific point
              // outroLogo.value = 0.1
              // outroApp.value = 0.1
              outroLogo.value = withTiming(
                1,
                { duration: 1200, easing: Easing.in(Easing.cubic) },
                () => {
                  runOnJS(onFinish)();
                }
              );
              outroApp.value = withTiming(1, {
                duration: 1200,
                easing: Easing.inOut(Easing.cubic),
              });
              outroAppOpacity.value = withTiming(1, {
                duration: 1200,
                easing: Easing.in(Easing.cubic),
              });
            }
          );
        })
        .catch(() => {});
    }
  }, [onFinish, intro, outroLogo, outroApp, outroAppOpacity, isReady]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  const logoAnimations =
    reduceMotion === true ? reducedLogoAnimation : logoAnimation;
  // special off-spec color for dark mode
  // const logoBg = isDarkMode ? "#0F1824" : "#fff";
  const logoBg = "#fff";

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      {!isAnimationComplete && (
        <View style={StyleSheet.absoluteFillObject}>
          <Image
            accessibilityIgnoresInvertColors
            onLoadEnd={onLoadEnd}
            source={{ uri: splashImageUri }}
            style={StyleSheet.absoluteFillObject}
          />

          {/* <Animated.View
            style={[
              bottomLogoAnimation,
              {
                position: "absolute",
                bottom: insets.bottom + 40,
                left: 0,
                right: 0,
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
              },
            ]}
          >
            <Logotype fill="#fff" width={90} />
          </Animated.View> */}
        </View>
      )}

      {isReady &&
        (isAndroid || reduceMotion === true ? (
          <>
            <Animated.View style={[{ flex: 1 }, appAnimation]}>
              {props.children}
            </Animated.View>

            {!isAnimationComplete && (
              <Animated.View
                style={[
                  StyleSheet.absoluteFillObject,
                  logoWrapperAnimation,
                  {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [
                      { translateY: -(insets.top / 2) },
                      { scale: 0.1 },
                    ], // scale from 1000px to 100px
                  },
                ]}
              >
                <AnimatedLogo
                  fill={logoBg}
                  style={[{ opacity: 0 }, logoAnimations]}
                />
              </Animated.View>
            )}
          </>
        ) : (
          <MaskedView
            style={[StyleSheet.absoluteFillObject]}
            maskElement={
              <Animated.View
                style={[
                  {
                    backgroundColor: "transparent",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [
                      { translateY: -(insets.top / 2) },
                      { scale: 0.1 },
                    ],
                  },
                ]}
              >
                <AnimatedLogo fill={logoBg} style={[logoAnimations]} />
              </Animated.View>
            }
          >
            {!isAnimationComplete && (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: logoBg,
                  },
                ]}
              />
            )}
            <Animated.View style={[{ flex: 1 }, appAnimation]}>
              {props.children}
            </Animated.View>
          </MaskedView>
        ))}
    </View>
  );
}
