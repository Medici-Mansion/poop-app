import { InputDeleteButton } from "@/assets/icons";
import FormField from "@/components/form-field";
import { Verify } from "@/types";
import React, { Ref, memo, useImperativeHandle } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ViewProps } from "react-native";
import { View } from "react-native";

interface VerifyCodeInputProps extends ViewProps {
  step: number;
  disabled?: boolean;
  isError?: boolean;
  formHandler: Ref<any>;
  onSubmitEditing?: () => void;
  onSuccess?: (state: boolean) => void;
}

export const VerifyCodeInput = memo(
  ({
    step,
    disabled,
    isError,
    onSuccess,
    formHandler,
    onSubmitEditing,
    ...viewProps
  }: VerifyCodeInputProps) => {
    const { getValues } = useFormContext();
    const form = useForm({
      defaultValues: {
        code: "",
        vid: getValues().phone,
        type: Verify.PHONE,
      },

      mode: "onChange",
    });

    useImperativeHandle(formHandler, () => form);

    return (
      <FormProvider {...form}>
        {step !== 5 ? null : (
          <View {...viewProps}>
            <Controller
              control={form.control}
              name={"code"}
              rules={{
                required: "인증 번호를 입력해주세요.",
              }}
              disabled={disabled}
              render={({ field }) => {
                return (
                  <FormField
                    {...field}
                    key="signup-verify-code-input"
                    errors={[isError ? "인증 번호를 다시 입력해주세요." : ""]}
                    onChangeText={(phoneNumber) => {
                      const cleanedText = phoneNumber.replace(/[^0-9]/g, "");
                      form.trigger("code");
                      field.onChange(cleanedText);
                    }}
                    suffix={
                      field.value ? (
                        <InputDeleteButton onPress={() => field.onChange("")} />
                      ) : null
                    }
                    maxLength={6}
                    onSubmitEditing={onSubmitEditing}
                    keyboardType="numeric"
                    label={"인증 번호"}
                    placeholder="인증 번호"
                    returnKeyType="next"
                    className={"text-body-b14 font-bold"}
                  />
                );
              }}
            />
          </View>
        )}
      </FormProvider>
    );
  }
);
