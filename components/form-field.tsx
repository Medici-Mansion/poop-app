import { Fragment, SetStateAction } from "react";
import { Keyboard, Text, TextInputProps } from "react-native";

import { Input } from "@/components/profile/create/input";

interface FormField extends TextInputProps {
  errors?: string[];
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  label?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  hint?: string;
  setPicker?: React.Dispatch<SetStateAction<boolean>>;
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
  ...rest
}: FormField) {
  const { ...inputProps } = rest;
  return (
    <Fragment>
      {label && (
        <Text className="mb-4 text-gray-200 text-body-b12 font-bold">
          {label}
        </Text>
      )}
      <Input
        {...inputProps}
        disabled={disabled}
        value={value}
        error={errors?.[0]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={name === "password"}
        editable={name !== "birthday"}
        autoCapitalize={"none"}
        onPressIn={() => {
          if (setPicker && name === "birthday") {
            setPicker(true);
            Keyboard.dismiss();
          }
        }}
      />
    </Fragment>
  );
}
