import { Text, TextInput, View } from "react-native";
import { theme } from '@/theme';
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

interface FormField {
  errors?: string[];
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
}

export default function Filter({
  errors = [],
  value = '',
  label = '',
  onChangeText = () => {},
  ...rest
}: FormField) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View className="w-full py-1.5 space-y-2">
      {label && <Text className="text-gray-200 b-12 text-14 font-bold mb-2">{label}</Text>}
      <View className="w-full h-16 px-4 border border-gray-400 rounded-2xl flex flex-row items-center relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className="text-white w-full"
          style={{ borderColor: isFocused ? theme.colors.gray[300] : theme.colors.gray[500]  }}
          onFocus={() => setIsFocused(true)}
          placeholderTextColor={theme.colors.gray[300]}
          editable={false}
          {...rest}
        />
        <View className="absolute right-4 flex items-center">
          <MaterialIcons name="keyboard-arrow-down" size={24} color='white' />
        </View>
      </View>
      {errors &&
        errors.map((error, idx) => (
          <Animated.Text
            entering={FadeIn.duration(100).springify().mass(0.3)}
            exiting={FadeOut.duration(100).springify().mass(0.3)}
            layout={CurvedTransition.duration(100).delay(120)}
            key={idx}
            className="text-system-red"
          >
            {error}
          </Animated.Text>
        ))}
    </View>
  );
}
