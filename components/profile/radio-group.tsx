import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RadioButtonProps {
  options?: { label: string; value: string }[];
  selectedOption?: string;
  onSelect?: (value: string) => void;
}

const RadioButton = (props: RadioButtonProps) => {
  const { options = [], selectedOption = '', onSelect = () => {} } = props;
  return (
    <View className='flex-row justify-start'>
      {options.map((option) => (
        <Pressable
          key={option.value}
          className='flex-row items-center mr-4'
          onPress={() => onSelect(option.value)}
        >
          {
            selectedOption === option.value ? 
            <MaterialCommunityIcons name="radiobox-marked" size={24} color="white" /> :
            <MaterialCommunityIcons name="radiobox-blank" size={24} color="white" />
          }

          <Text className='text-white text-14 font-bold ml-2'>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default RadioButton;
