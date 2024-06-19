import React, { PropsWithChildren } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressableWrapper = Animated.createAnimatedComponent(Pressable);

const AnimatedPressable = (props: PropsWithChildren<PressableProps>) => {
  const { 
    style, 
    onPress, 
    onPressIn, 
    onPressOut, 
    children 
  } = props;

  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  // PressEvent 수정
  const handlePressIn = (event: PressEvent) => {
    opacity.value = withSpring(0.8);
    scale.value = withSpring(0.98, { damping: 10 });
    onPressIn && onPressIn(event);
  };

  const handlePressOut = (event: PressEvent) => {
    opacity.value = withSpring(1);
    scale.value = withSpring(1);
    onPressOut && onPressOut(event);
  };

  return (
    <AnimatedPressableWrapper
      onPress={onPress}
      style={[{ opacity, transform: [{ scale }] }, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      {children}
    </AnimatedPressableWrapper>
  );
};

export default AnimatedPressable;