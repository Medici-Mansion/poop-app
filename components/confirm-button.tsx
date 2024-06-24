import { View, Text, Pressable } from "react-native";
import React from "react";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

interface ConfirmButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const CornfirmButton = ({ title, onPress, disabled }: ConfirmButtonProps) => {
  return (
    <View className="w-full p-4 bg-white rounded-xl">
      <Pressable onPress={onPress} disabled={disabled}>
        <Text className={cn("text-center")}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default CornfirmButton;
