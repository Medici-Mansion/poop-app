// TODO: 기존 input의 onPress 영역을 수정한 컴포넌트 - 기존 ui/input.tsx과 합쳐야함

import { mergeRefs, cn } from "@/utils";
import { theme } from "@/theme";
import { RefObject, forwardRef, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  Platform,
} from "react-native";
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
  useAnimatedProps,
} from "react-native-reanimated";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  inputClass?: string;
  onOuterPressIn?: (event: GestureResponderEvent) => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    { inputClass = "", label, error, hint, disabled, onOuterPressIn, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const bgColor = error
      ? theme.colors.system.red
      : isFocused
      ? "#FFFFFF"
      : "transparent";
    const animatedStyles = useAnimatedProps(() => {
      return {
        borderColor: bgColor,
      };
    }, [error, isFocused]);

    const innerRef = useRef<TextInput | null>(null);

    return (
      <Pressable
        disabled={disabled}
        className="space-y-3 relative"
        onPressIn={(event) => {
          if (disabled) return;
          onOuterPressIn && onOuterPressIn(event);
          (ref as RefObject<TextInput>)?.current?.focus();
        }}
      >
        {label && <Text className="text-body-b12 text-gray-200">{label}</Text>}
        <Animated.View
          className={"border-2 rounded-[20px] bg-gray-500"}
          style={[animatedStyles]}
        >
          <TextInput
            ref={mergeRefs(innerRef, ref)}
            placeholderTextColor={theme.colors.gray[300]}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            autoCorrect={false}
            spellCheck={false}
            clearButtonMode="while-editing"
            className={cn("text-body-m14 text-white p-6", inputClass)}
            {...props}
            editable={!disabled}
            selectTextOnFocus={!disabled}
          />
        </Animated.View>
        {hint ? (
          <Animated.Text
            entering={FadeIn.duration(100).springify().mass(0.3)}
            exiting={FadeOut.duration(100).springify().mass(0.3)}
            layout={CurvedTransition.duration(100).delay(120)}
            key={hint}
            className="text-gray-300 text-body-m12"
          >
            {hint}
          </Animated.Text>
        ) : (
          error && (
            <Animated.Text
              entering={FadeIn.duration(100).springify().mass(0.3)}
              exiting={FadeOut.duration(100).springify().mass(0.3)}
              layout={CurvedTransition.duration(100).delay(120)}
              key={error}
              className="text-system-red"
            >
              {error}
            </Animated.Text>
          )
        )}
      </Pressable>
    );
  }
);
