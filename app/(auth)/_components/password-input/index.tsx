import { InputEyeOff, InputEyeOn } from "@/assets/icons";
import FormField from "@/components/form-field";
import React, { memo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, ViewProps } from "react-native";
import { View } from "react-native";

interface PasswordInputProps extends ViewProps {
  step: number;
  onSuccess?: () => void;
  validateFn?: () => void;
  disabled?: boolean;
  onSubmitEditing?: () => void;
}

export const PasswordInput = memo(
  ({
    step,
    onSuccess,
    validateFn,
    disabled,
    ...viewProps
  }: PasswordInputProps) => {
    const [isEyeOn, setIsEyeOn] = useState(false);
    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <View {...viewProps}>
        <Controller
          control={control}
          name={"password"}
          rules={{
            required: "비밀번호를 입력해주세요.",
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
                inputRef={field.ref}
                key="signup-password-input"
                errors={[(errors.password?.message as string) ?? ""]}
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
                hint={step === 1 ? "띄어쓰기 없이 6~12자로 입력해주세요." : ""}
                label={step !== 1 ? "비밀번호" : ""}
                placeholder="비밀번호"
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
