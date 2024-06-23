import { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  SharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ConsonantCarouselProps {
  animationValue: SharedValue<number>;
  label: string;
  selected: boolean;
  onPress?: () => void;
}

/** 
 * ConsonantItem
 * 자음 아이템
 * 선택시 애니메이션 효과가 적용되는 컴포넌트
 * */ 
const ConsonantItem = (props: ConsonantCarouselProps) => {
  const { animationValue, label, onPress } = props;

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [0.5, 1, 0.5], Extrapolation.CLAMP);

    return { opacity };
  }, [animationValue]);

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-1, 0, 1], [1, 1.25, 1], Extrapolation.CLAMP);
    const color = interpolateColor(animationValue.value, [-1, 0, 1], ['#959595', '#959595', 'white']);

    return {
      transform: [{ scale }, { translateY: translateY.value }],
      color,
    };
  }, [animationValue, translateY]);

  const onPressIn = useCallback(() => {
    translateY.value = withTiming(-8, { duration: 250 });
  }, [translateY]);

  const onPressOut = useCallback(() => {
    translateY.value = withTiming(0, { duration: 250 });
  }, [translateY]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[ style.container, containerStyle ]}>
        <Animated.Text style={[style.text, labelStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: 'white',
  }
});

export default ConsonantItem;