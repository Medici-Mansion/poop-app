// TODO: 기존 input의 onPress 영역을 수정한 컴포넌트 - 기존 ui/input.tsx과 합쳐야함

import { mergeRefs, cn } from '@/utils';
import { theme } from '@/theme';
import { RefObject, forwardRef, useRef } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  Platform,
} from 'react-native';
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
  useAnimatedProps,
} from 'react-native-reanimated';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  inputClass?: string
  onOuterPressIn?: (event: GestureResponderEvent) => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ inputClass = '', label, error, hint, disabled, onOuterPressIn, ...props }, ref) => {
    const bgColor = error ? theme.colors.system.red : 'transparent';
    const animatedStyles = useAnimatedProps(() => {
      return {
        borderColor: bgColor,
      };
    });

    const innerRef = useRef<TextInput | null>(null);

    return (
      <Pressable
        disabled={disabled}
        className="space-y-3 relative"
        onPressIn={event => {
          onOuterPressIn && onOuterPressIn(event);
          (ref as RefObject<TextInput>)?.current?.focus();
        }}>
        {label && <Text className="text-body-b12 text-gray-200">{label}</Text>}
        <Animated.View style={[animatedStyles]}>
          <TextInput
            ref={mergeRefs(innerRef, ref)}
            placeholderTextColor={theme.colors.gray[300]}
            autoCorrect={false}
            spellCheck={false}
            clearButtonMode="while-editing"
            className={cn(
              'text-body-m14 text-white px-6 rounded-xl bg-gray-500',
              Platform.OS === 'ios' && 'py-4',
              inputClass,
            )}
            {...props}
          />
        </Animated.View>
        {hint ? (
          <Animated.Text
            entering={FadeIn.duration(100).springify().mass(0.3)}
            exiting={FadeOut.duration(100).springify().mass(0.3)}
            layout={CurvedTransition.duration(100).delay(120)}
            key={hint}
            className="text-white">
            {hint}
          </Animated.Text>
        ) : (
          error && (
            <Animated.Text
              entering={FadeIn.duration(100).springify().mass(0.3)}
              exiting={FadeOut.duration(100).springify().mass(0.3)}
              layout={CurvedTransition.duration(100).delay(120)}
              key={error}
              className="text-system-red">
              {error}
            </Animated.Text>
          )
        )}
      </Pressable>
    );
  },
);