import React from "react";
import { Button } from "./ui";
import { PressableProps } from "react-native";

interface ConfirmButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const CornfirmButton = ({
  title,
  onPress,
  disabled,
  ...rest
}: ConfirmButtonProps) => {
  return (
    <Button label={title} onPress={onPress} disabled={disabled} {...rest} />
  );
};

export default CornfirmButton;
