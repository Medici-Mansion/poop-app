import React, { useState } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";

import Images from "@/constants/Images";
import { loginFormSchema } from "@/schema";
import { SignInErrorType } from "@/types";

import ConfirmButton from "@/components/confirm-button";
import FormController from "@/components/form-controller";

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
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="px-10 flex flex-col flex-1 py-20 items-center">
        <Image
          source={Images.logo}
          resizeMode="contain"
          style={{ width: 150, height: 140 }}
        />
        <View className="w-full">
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
    </SafeAreaView>
  );
};

export default SignIn;
