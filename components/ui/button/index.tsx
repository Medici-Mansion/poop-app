import React, { LegacyRef, forwardRef } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const buttonVariatns = cva(
  "flex justify-center items-center py-4 mx-auto bg-white w-full",
  {
    variants: {
      variant: {
        single: "",
        horizontal: "",
        vertical: "",
        outlined: "border-gray-300 bg-transparent-0 text-white border-[1px]",
      },

      size: {
        s: "",
        md: "rounded-2xl",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "single",
      size: "md",
    },
    compoundVariants: [
      {
        variant: "horizontal",
        size: "md",
      },
    ],
  }
);

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariatns> {
  label: string;
  secondary?: ButtonProps & { label: string };
  variant?: "single" | "horizontal" | "vertical" | "outlined";
}

export const Button = forwardRef<View, ButtonProps>(
  (
    { variant = "single", size, label, secondary, ...props }: ButtonProps,
    ref
  ) => {
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    const handlePressIn = () => {
      opacity.value = withSpring(0.8);
      scale.value = withSpring(0.98, {
        damping: 10,
      });
    };

    const handlePressOut = () => {
      opacity.value = withSpring(1);
      scale.value = withSpring(1);
    };

    return (
      <View className="space-y-4">
        <AnimatedPressable
          {...props}
          ref={ref}
          style={[{ opacity, transform: [{ scale }] }, props.style]}
          onPressIn={(event) => {
            handlePressIn();
            props.onPressIn && props.onPressIn(event);
          }}
          onPressOut={(event) => {
            handlePressOut();
            props.onPressOut && props.onPressOut(event);
          }}
          className={cn(
            buttonVariatns({ variant, size }),
            props.disabled && "bg-gray-300",
            props.className
          )}
        >
          <Text
            className={cn(
              "text-body-b14 font-bold",
              variant === "outlined" ? "text-white" : ""
            )}
          >
            {label}
          </Text>
        </AnimatedPressable>
        {variant === "vertical" && (
          <Pressable {...secondary} className={cn("mx-auto")}>
            <Text className="text-gray-200 text-body-b12">
              {secondary?.label}
            </Text>
          </Pressable>
        )}
      </View>
    );
  }
);
