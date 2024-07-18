import { InputEyeOff, InputEyeOn } from "@/assets/icons";
import FormField from "@/components/form-field";
import React, { memo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, ViewProps } from "react-native";
import { View } from "react-native";

interface PasswordConfirmInputProps extends ViewProps {
  step: number;
  disabled?: boolean;
  onSubmitEditing?: () => void;
}

export const PasswordConfirmInput = memo(
  ({ step, disabled, ...viewProps }: PasswordConfirmInputProps) => {
    const [isEyeOn, setIsEyeOn] = useState(false);
    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <View {...viewProps}>
        <Controller
          control={control}
          name={"passwordConfirm"}
          rules={{
            required: "비밀번호를 한 번 더 입력해주세요.",
            minLength: {
              value: 6,
              message: "띄어쓰기 없이 6~12자로 입력해주세요.",
            },
            maxLength: {
              value: 12,
              message: "띄어쓰기 없이 6~12자로 입력해주세요.",
            },
          }}
          disabled={disabled}
          render={({ field }) => {
            return (
              <FormField
                {...field}
                key="signup-password-confirm-input"
                errors={[(errors.passwordConfirm?.message as string) ?? ""]}
                onChangeText={(newPassword) => {
                  const trimmedInput = newPassword.replace(/\s+/g, "");
                  field.onChange(trimmedInput);
                }}
                suffix={
                  !field.value ? null : (
                    <Pressable onPress={() => setIsEyeOn((prev) => !prev)}>
                      {isEyeOn ? <InputEyeOff /> : <InputEyeOn />}
                    </Pressable>
                  )
                }
                secureTextEntry={!isEyeOn}
                placeholder="비밀번호 확인"
                returnKeyType="next"
                hint={step === 2 ? "띄어쓰기 없이 6~12자로 입력해주세요." : ""}
                label={step !== 2 ? "비밀번호 확인" : ""}
                className={"text-body-b14 font-bold"}
              />
            );
          }}
        />
      </View>
    );
  }
);
