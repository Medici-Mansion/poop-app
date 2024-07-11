import React, { SetStateAction } from "react";

import { Controller, UseFormSetValue } from "react-hook-form";
import FormField from "@/components/form-field";
import { ViewProps } from "react-native";

interface FormControllerProps extends ViewProps {
  control: any;
  name: string;
  placeholder?: string;
  errors: string[];
  isEmail?: boolean;
  disabled?: boolean;
  setIsEmail?: React.Dispatch<SetStateAction<boolean>>;
  setPicker?: React.Dispatch<SetStateAction<boolean>>;
  setValue?: UseFormSetValue<{
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

const FormController = ({
  control,
  name,
  placeholder,
  errors,
  disabled,
  setPicker,
  setValue,
  isEmail,
  setIsEmail,
  ...viewProps
}: FormControllerProps) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormField
          {...viewProps}
          disabled={disabled}
          placeholder={placeholder || ""}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          errors={errors}
          name={name}
          setPicker={setPicker}
          setValue={setValue ? setValue : () => {}}
          isEmail={isEmail}
          setIsEmail={setIsEmail}
        />
      )}
      name={name}
    />
  );
};

export default FormController;
