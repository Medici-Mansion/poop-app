import React, { ReactNode, SetStateAction } from "react";

import { Controller, UseFormSetValue } from "react-hook-form";
import FormField from "@/components/form-field";
import { TextInputProps, View, ViewProps } from "react-native";

interface FormControllerProps extends ViewProps {
  control: any;
  name: string;
  placeholder?: string;
  errors: string[];
  disabled?: boolean;
  setPicker?: React.Dispatch<SetStateAction<boolean>>;
  textInputProps?: TextInputProps & { accessoryView?: () => JSX.Element };
}

const FormController = ({
  control,
  name,
  placeholder,
  errors,
  disabled,
  setPicker,
  textInputProps,
  ...viewProps
}: FormControllerProps) => {
  return (
    <View {...viewProps}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormField
            {...textInputProps}
            className={"text-body-b14"}
            disabled={disabled}
            placeholder={placeholder || ""}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errors={errors}
            name={name}
            setPicker={setPicker}
          />
        )}
      />
    </View>
  );
};

export default FormController;
