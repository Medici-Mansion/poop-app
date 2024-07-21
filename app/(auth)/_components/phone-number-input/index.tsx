import { InputDeleteButton } from "@/assets/icons";
import FormField from "@/components/form-field";
import React, { memo, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ViewProps } from "react-native";
import { View } from "react-native";

interface PhoneNumberInputProps extends ViewProps {
  step: number;
  disabled?: boolean;
  onSubmitEditing?: () => void;
}

export const PhoneNumberInput = memo(
  ({ step, disabled, ...viewProps }: PhoneNumberInputProps) => {
    const {
      control,
      getValues,
      formState: { errors },
    } = useFormContext();

    const formatPhoneNumber = useCallback((number: string) => {
      const cleaned = ("" + number).replace(/[^0-9]/g, "");
      const match = cleaned.match(/^(010)(\d{3,4})(\d{4})$/);
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
      }

      return number;
    }, []);

    return (
      <View {...viewProps}>
        <Controller
          control={control}
          name={"phone"}
          rules={{
            required: "휴대폰 번호를 입력해주세요.",
            pattern: {
              value: /^(010)(\d{3,4})(\d{4})$/,
              message: "올바른 휴대폰 번호를 입력해주세요.",
            },
          }}
          disabled={disabled}
          render={({ field }) => {
            return (
              <FormField
                {...field}
                inputRef={field.ref}
                value={formatPhoneNumber(field.value)}
                key="signup-phone-number-input"
                errors={[(errors.phone?.message as string) ?? ""]}
                onChangeText={(phoneNumber) => {
                  const cleanedText = phoneNumber.replace(/[^0-9]/g, "");
                  field.onChange(cleanedText);
                }}
                suffix={
                  field.value ? (
                    <InputDeleteButton onPress={() => field.onChange("")} />
                  ) : null
                }
                maxLength={13}
                keyboardType="numeric"
                label={step !== 4 ? "휴대폰 번호" : ""}
                placeholder="휴대폰 번호"
                returnKeyType="next"
                className={"text-body-b14 font-bold"}
              />
            );
          }}
        />
      </View>
    );
  }
);
