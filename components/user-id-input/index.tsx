import FormField from "@/components/form-field";
import { Controller, useFormContext } from "react-hook-form";
import { View, ViewProps } from "react-native";
import { InputCheckbutton, InputDeleteButton } from "@/assets/icons";
import { mergeRefs } from "@/lib/utils";

interface UserIdInputProps extends ViewProps {
  step: number;
  disabled?: boolean;
  isSuccess?: boolean;
  validateFn?: () => void;
  onSubmitEditing?: () => void;
}

export const UserIdInput = ({
  step,
  disabled,
  isSuccess,
  validateFn,
  ...viewProps
}: UserIdInputProps) => {
  const { ...rest } = viewProps;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View {...rest}>
      <Controller
        rules={{
          required: "아이디을 입력해주세요.",
          minLength: {
            message: "띄어쓰기 없이 영문 2~12자로 입력해주세요.",
            value: 2,
          },
          maxLength: {
            message: "띄어쓰기 없이 영문 2~12자로 입력해주세요.",
            value: 12,
          },
        }}
        disabled={disabled}
        control={control}
        name={"userId"}
        render={({ field }) => (
          <FormField
            {...field}
            inputRef={field.ref}
            errors={[(errors.nickname?.message as string) ?? ""]}
            disabled={disabled}
            onChangeText={(newText) => {
              if (!newText) return field.onChange(newText);

              const filteredText = newText.replace(/[^a-zA-Z]/g, "");
              field.onChange(filteredText);
            }}
            suffix={
              isSuccess ? (
                <InputCheckbutton />
              ) : field.value ? (
                <InputDeleteButton onPress={() => field.onChange("")} />
              ) : null
            }
            hint={step === 0 ? "띄어쓰기 없이 영문 2~12자로 입력해주세요." : ""}
            label={step !== 0 ? "아이디" : ""}
            placeholder="아이디"
            returnKeyType="next"
            className={"text-body-b14 font-bold"}
          />
        )}
      />
    </View>
  );
};
