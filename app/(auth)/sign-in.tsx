import React, { useState } from "react";
import { View, Image } from "react-native";
import { useForm } from "react-hook-form";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Images from "@/constants/Images";
import { loginFormSchema } from "@/schema";
import { SignInErrorType } from "@/types";

import ConfirmButton from "@/components/confirm-button";
import FormController from "@/components/form-controller";
import TermsSheet from "@/components/bottom-sheet/turms-sheet";

interface SignInFields {
  id: number;
  name: "id" | "password";
}

const formValues: SignInFields[] = [
  {
    id: 1,
    name: "id",
  },
  {
    id: 2,
    name: "password",
  },
];

const SignIn = () => {
  const [error, setError] = useState<SignInErrorType>({});
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (data: { id: string; password: string }) => {
    const result = await loginFormSchema.spa(data);
    if (!result.success) {
      setError(result.error.flatten());
      return;
    }

    setError({});
  };

  return (
    <GestureHandlerRootView className="bg-background h-full">
      <View className="px-10 flex flex-col py-20 items-center h-full justify-between">
        <View className="w-full flex items-center pt-5">
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={{ width: 150, height: 140 }}
          />
          <View className="w-full pt-12">
            {formValues.map((field) => (
              <FormController
                key={field.id}
                control={control}
                name={field.name || ""}
                placeholder={field.name === "id" ? "아이디" : "비밀번호"}
                errors={error?.fieldErrors?.[field.name] || []}
              />
            ))}
            <View className="py-2">
              <ConfirmButton title="확인" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
        <TermsSheet />
      </View>
    </GestureHandlerRootView>
  );
};

export default SignIn;
