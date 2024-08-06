import React, { LegacyRef, PropsWithChildren, forwardRef } from "react";
import { Pressable, PressableProps, Text, View, ViewProps } from "react-native";
import Animated, {
  SharedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const buttonVariatns = cva(
  "flex justify-center items-center py-4 mx-auto bg-white h-[56px]",
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
        full: "w-full rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "single",
      size: "full",
    },
    compoundVariants: [
      {
        variant: "horizontal",
        size: "full",
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
  viewProps?: ViewProps;
}

export const Button = forwardRef<View, PropsWithChildren<ButtonProps>>(
  (
    {
      variant = "single",
      size,
      children,
      label,
      secondary,
      viewProps,
      ...props
    },
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
      <View {...viewProps} className={cn("space-y-4", viewProps?.className)}>
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
          {children ? (
            children
          ) : (
            <Text
              className={cn(
                "text-body4-m16 font-bold",
                variant === "outlined" ? "text-white" : ""
              )}
            >
              {label}
            </Text>
          )}
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
