import {
  Fragment,
  ReactNode,
  SetStateAction,
  forwardRef,
  memo,
  useRef,
} from "react";
import { Text, TextInputProps } from "react-native";

import { Input } from "@/components/profile/create/input";
import { RefCallBack } from "react-hook-form";
import { TextInput } from "react-native";

interface FormField extends TextInputProps {
  errors?: string[];
  value: string;
  onChangeText?: (text: string) => void;
  onBlur: () => void;
  label?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  hint?: string;
  suffix?: ReactNode;
  setPicker?: React.Dispatch<SetStateAction<boolean>>;
  inputRef?: RefCallBack;
}

const FormField = forwardRef<TextInput, FormField>(
  (
    {
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
    },
    ref
  ) => {
    const { inputRef, ...inputProps } = rest;
    return (
      <Fragment>
        {label && (
          <Text className="mb-4 text-gray-200 text-body-b12 font-bold">
            {label}
          </Text>
        )}
        <Input
          {...inputProps}
          ref={ref}
          disabled={disabled}
          value={value}
          error={errors?.[0]}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoCapitalize={"none"}
        />
      </Fragment>
    );
  }
);
export default memo(FormField);
