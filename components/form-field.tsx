import { Text, TextInput, View } from "react-native";

import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
  useAnimatedProps,
} from "react-native-reanimated";

interface FormField {
  errors?: string[];
  value: string;
  onChangeText: () => void;
  onBlur: () => void;
  label?: string;
  placeholder: string;
}

export default function FormField({
  errors = [],
  value,
  onChangeText,
  onBlur,
  label,
  placeholder,
  ...rest
}: FormField) {
  return (
    <View className="py-1.5 space-y-2">
      {label && <Text>{label}</Text>}
      <View className="w-full h-16 px-4 bg-gray-400 rounded-2xl border-none  focus:border-gray-300 flex flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className="text-white"
          placeholderTextColor="#FFFFFF"
          placeholder={placeholder}
          {...rest}
        />
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
