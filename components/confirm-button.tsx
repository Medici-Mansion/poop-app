import { View, Text, Pressable } from "react-native";
import React from "react";

interface ConfirmButtonProps {
  title: string;
  onPress: () => void;
}

const CornfirmButton = ({ title, onPress }: ConfirmButtonProps) => {
  return (
    <View className="w-full p-4 bg-white rounded-xl">
      <Pressable onPress={onPress}>
        <Text className="text-center pr-3">{title}</Text>
      </Pressable>
    </View>
  );
};

export default CornfirmButton;
