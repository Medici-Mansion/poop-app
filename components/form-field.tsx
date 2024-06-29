import { SetStateAction } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { UseFormSetValue } from "react-hook-form";

interface FormField {
  errors?: string[];
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  label?: string;
  placeholder: string;
  name?: string;
  isEmail?: boolean;
  setIsEmail?: React.Dispatch<SetStateAction<boolean>>;
  setPicker?: React.Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<{
    id: string;
    nickname: string;
    password: string;
    birthday: string;
    phone: string;
    email: string;
    gender: string;
    code: string;
  }>;
}

export default function FormField({
  errors = [],
  value,
  onChangeText,
  onBlur,
  label,
  placeholder,
  name,
  setPicker,
  setValue,
  isEmail,
  setIsEmail,
  ...rest
}: FormField) {
  return (
    <View className="py-1.5 space-y-3">
      {label && <Text>{label}</Text>}
      {name === "gender" ? (
        <View className="py-4">
          <SegmentedControl
            values={["여성", "남성", "선택 안 함"]}
            selectedIndex={0}
            onChange={(event) => {
              setValue(
                "gender",
                event.nativeEvent.selectedSegmentIndex === 0
                  ? "FEMALE"
                  : event.nativeEvent.selectedSegmentIndex === 1
                  ? "MALE"
                  : "NONE"
              );
            }}
          />
        </View>
      ) : name === "phone" || name === "email" ? (
        <View className="w-full space-y-5">
          <SegmentedControl
            values={["휴대폰", "이메일"]}
            selectedIndex={isEmail ? 1 : 0}
            onChange={(event) => {
              const selectedIndex = event.nativeEvent.selectedSegmentIndex;
              if (setIsEmail) {
                setIsEmail(selectedIndex === 1);
              }
              if (selectedIndex === 1) {
                setValue("phone", "");
              } else {
                setValue("email", "");
              }
            }}
          />
          <View className="w-full px-4 h-16 bg-gray-500 rounded-2xl flex flex-row items-center border focus:border-1 focus:border-gray-300">
            <TextInput
              value={value}
              onChangeText={(text) => {
                setValue(isEmail ? "email" : "phone", text);
                onChangeText(text);
              }}
              className="text-white"
              placeholderTextColor="#FFFFFF"
              placeholder={isEmail ? "이메일" : "휴대폰"}
              {...rest}
            />
          </View>
        </View>
      ) : (
        <View className="w-full h-16 px-4 bg-gray-500 rounded-2xl flex flex-row items-center border focus:border-1 focus:border-gray-300">
          <TextInput
            value={value}
            onChangeText={onChangeText}
            className="text-white"
            placeholderTextColor="#FFFFFF"
            placeholder={placeholder}
            secureTextEntry={name === "password"}
            editable={name !== "birthday"}
            onPressIn={() => {
              if (setPicker && name === "birthday") {
                setPicker(true);
                Keyboard.dismiss();
              }
            }}
            {...rest}
          />
        </View>
      )}
      {errors &&
        errors.map((error, idx) => {
          return (
            <Animated.Text
              entering={FadeIn.duration(100).springify().mass(0.3)}
              exiting={FadeOut.duration(100).springify().mass(0.3)}
              layout={CurvedTransition.duration(100).delay(120)}
              key={idx}
              className="text-system-red"
            >
              {error}
            </Animated.Text>
          );
        })}
    </View>
  );
}
