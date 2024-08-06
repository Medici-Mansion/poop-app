import { SvgProps } from "react-native-svg";
import Pressed from "./pressed.svg";
import UnPressed from "./unpressed.svg";
import { AnimatedPressable } from "@/components/ui/animate-pressable";
import Animated from "react-native-reanimated";
import { BounceIn, BounceOut } from "react-native-reanimated";
import { PressableProps } from "react-native";
import { forwardRef } from "react";

interface CheckBoxProps extends PressableProps {
  checked?: boolean;
  iconProps?: SvgProps;
}

export const CheckBox = forwardRef(({ checked, ...props }: CheckBoxProps) => {
  const { iconProps, ...rest } = props;
  return (
    <AnimatedPressable {...rest}>
      {checked ? <Pressed {...iconProps} /> : <UnPressed {...iconProps} />}
    </AnimatedPressable>
  );
});
