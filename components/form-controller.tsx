import React from "react";

import { Controller } from "react-hook-form";
import FormField from "./form-field";

interface FormControllerProps {
  control: any;
  name: string;
  placeholder?: string;
  errors: string[];
}

const FormController = ({
  control,
  name,
  placeholder,
  errors,
}: FormControllerProps) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormField
          placeholder={placeholder || ""}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          errors={errors}
        />
      )}
      name={name}
    />
  );
};

export default FormController;
