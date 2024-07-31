import React from "react";
import { View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButtonItem } from "@/components/ui/radio-button/radio-button";

interface RadioButtonProps {
  options?: { label: string; value: string }[];
  selectedOption?: string;
  onSelect?: (value: string) => void;
  label?: string;
}

/**
 * RadioGroup
 * press 애니메이션이 적용된 라디오 버튼 그룹
 * */
const RadioGroup = (props: RadioButtonProps) => {
  const {
    options = [],
    selectedOption = "",
    label = "",
    onSelect = () => {},
  } = props;
  return (
    <>
      {label && (
        <Text className="text-gray-200 b-12 text-14 font-bold mb-2">
          {label}
        </Text>
      )}
      <View className="flex-row justify-start">
        {options.map((option) => (
          <RadioButtonItem
            key={option.value}
            value={option.value}
            className="flex-row items-center mr-4"
            onPressOut={() => onSelect(option.value)}
          >
            {selectedOption === option.value ? (
              <MaterialCommunityIcons
                name="radiobox-marked"
                size={24}
                color="white"
              />
            ) : (
              <MaterialCommunityIcons
                name="radiobox-blank"
                size={24}
                color="white"
              />
            )}
            <Text className="text-white text-14 font-bold ml-2">
              {option.label}
            </Text>
          </RadioButtonItem>
        ))}
      </View>
    </>
  );
};

export default RadioGroup;
