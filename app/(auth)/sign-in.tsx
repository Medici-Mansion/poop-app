import React, { useState } from "react";
import { View, Image } from "react-native";
import { useForm } from "react-hook-form";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Images from "@/constants/Images";
import { signinFormSchema } from "@/schema";
import { SignInErrorType, Token } from "@/types";

import ConfirmButton from "@/components/confirm-button";
import FormController from "@/components/form-controller";
import TermsSheet from "@/components/bottom-sheet/turms-sheet";
import { SigninFormField } from "@/constants/form-filed";
import { z } from "zod";
import useLogin from "@/hooks/user/use-login";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyProfileList, injectInterceptor } from "@/apis";

const SignIn = () => {
  const { mutateAsync } = useLogin({
    onSuccess: async (data) => {
      const { accessToken } = data.body || {};
      await Promise.allSettled([AsyncStorage.setItem(Token.ACT, accessToken)]);
      injectInterceptor({ accessToken });

      const response = await getMyProfileList();
      if (!response.result.length) {
        return router.replace("/create-profile");
      }
    },
    onError: (err) => console.log(err),
  });
  const [error, setError] = useState<SignInErrorType>({});
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (fields: z.infer<typeof signinFormSchema>) => {
    const result = await signinFormSchema.spa(fields);
    if (!result.success) {
      setError(result.error.flatten());
      return;
    } else {
      const convertLowerCase = { ...fields, id: getValues("id").toLowerCase() };
      mutateAsync(convertLowerCase);
    }

    setError({});
  };

  return (
    <GestureHandlerRootView className="bg-gray-600 h-full">
      <View className="px-10 flex flex-col py-20 items-center h-full justify-between">
        <View className="w-full flex items-center pt-5">
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={{ width: 150, height: 140 }}
          />
          <View className="w-full pt-12">
            {SigninFormField.map((field) => (
              <FormController
                key={field.id}
                control={control}
                name={field.name || ""}
                placeholder={field.name === "id" ? "아이디" : "비밀번호"}
                errors={error?.fieldErrors?.[field.name] || []}
              />
            ))}
            <View className="py-2">
              <ConfirmButton title="로그인" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
        <TermsSheet />
      </View>
    </GestureHandlerRootView>
  );
};

export default SignIn;
