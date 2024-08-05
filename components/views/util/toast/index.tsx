import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import RootSiblings from "react-native-root-siblings";

import { useAnimatedValue } from "@/hooks/use-animated-value";

const TIMEOUT = 4e3;

export function show(message: string) {
  const item = new RootSiblings(<Toast message={message} />);
  setTimeout(() => {
    item.destroy();
  }, TIMEOUT);
}

function Toast({ message }: { message: string }) {
  const interp = useAnimatedValue(0);

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(interp, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.delay(3700),
      Animated.timing(interp, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  });

  const opacityStyle = { opacity: interp };
  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.toast, opacityStyle]}>
        <Text>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  toast: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    marginHorizontal: 6,
  },
  toastDark: {
    backgroundColor: "gray",
    shadowOpacity: 0.5,
  },
});
