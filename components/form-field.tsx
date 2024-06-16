import { Text, TextInput, View } from "react-native";

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
      <View className="w-full h-16 px-4 bg-[#353434] rounded-2xl border-none  focus:border-gray-300 flex flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className="text-white"
          placeholderTextColor="#FFFFFF"
          placeholder={placeholder}
          {...rest}
        />
      </View>
      {errors && errors.map((item, idx) => <Text key={idx}>{item}</Text>)}
    </View>
  );
}
