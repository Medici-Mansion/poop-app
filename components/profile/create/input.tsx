// TODO: 기존 input의 onPress 영역을 수정한 컴포넌트 - 기존 ui/input.tsx과 합쳐야함

import { mergeRefs, cn } from "@/lib/utils";
import { theme } from "@/theme";
import {
  ReactNode,
  RefObject,
  forwardRef,
  memo,
  useRef,
  useState,
} from "react";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
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
  suffix?: ReactNode;
  containerClassName?: string;
  onOuterPressIn?: (event: GestureResponderEvent) => void;
}

export const Input = memo(
  forwardRef<TextInput, InputProps>(
    (
      {
        inputClass = "",
        label,
        error,
        hint,
        disabled,
        containerClassName,
        onOuterPressIn,
        suffix,
        ...props
      },
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
          {label && (
            <Text className="text-body-b12 text-gray-200">{label}</Text>
          )}
          <Animated.View
            className={cn(
              "border-2 rounded-[20px] bg-gray-500 flex-row items-center justify-between pr-6",
              containerClassName
            )}
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
              {...props}
              className={cn(
                "text-body4-m16 text-white flex-1 p-6 py-[21px] pr-0",
                inputClass
              )}
              style={{ fontSize: 16 }}
              editable={!disabled}
              selectTextOnFocus={!disabled}
            />
            {suffix}
          </Animated.View>
          {error ? (
            <Animated.Text
              entering={FadeIn.duration(100).springify().mass(0.3)}
              exiting={FadeOut.duration(100).springify().mass(0.3)}
              layout={CurvedTransition.duration(100).delay(120)}
              key={error}
              className="text-system-red"
            >
              {error}
            </Animated.Text>
          ) : hint ? (
            <Animated.Text
              entering={FadeIn.duration(100).springify().mass(0.3)}
              exiting={FadeOut.duration(100).springify().mass(0.3)}
              layout={CurvedTransition.duration(100).delay(120)}
              key={hint}
              className="text-gray-300 text-body-m12"
            >
              {hint}
            </Animated.Text>
          ) : null}
        </Pressable>
      );
    }
  )
);
