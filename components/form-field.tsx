import { SetStateAction } from "react";
import { Keyboard, Text, View, ViewProps } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { UseFormSetValue } from "react-hook-form";
import { Input } from "@/components/profile/create/input";

interface FormField extends ViewProps {
  errors?: string[];
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  label?: string;
  placeholder: string;
  name?: string;
  isEmail?: boolean;
  disabled?: boolean;
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
  disabled,
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
    <View {...rest}>
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

          <Input
            value={value}
            onChangeText={(text) => {
              setValue(isEmail ? "email" : "phone", text);
              onChangeText(text);
            }}
            placeholder={isEmail ? "이메일" : "휴대폰"}
          />
        </View>
      ) : (
        <Input
          disabled={disabled}
          value={value}
          onChangeText={onChangeText}
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
      )}
      {errors &&
        errors.map((error, idx) => {
          return (
            <Animated.Text
              entering={FadeIn.duration(100).springify().mass(0.3)}
              exiting={FadeOut.duration(100).springify().mass(0.3)}
              layout={CurvedTransition.duration(100).delay(120)}
              key={idx}
              className="text-system-red mt-2"
            >
              {error}
            </Animated.Text>
          );
        })}
    </View>
  );
}
