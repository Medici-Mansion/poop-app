import React, { useState } from "react";
import { View, Image } from "react-native";
import { useForm } from "react-hook-form";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

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
import { AxiosError } from "axios";
import { Response } from "@/types/server";

const SignIn = () => {
  const [error, setError] = useState<SignInErrorType>({});

  const { mutateAsync, isPending } = useLogin({
    onSuccess: async (data) => {
      const { accessToken } = data || {};
      await Promise.allSettled([AsyncStorage.setItem(Token.ACT, accessToken)]);
      injectInterceptor({ accessToken });

      const response = await getMyProfileList();
      if (!response.body.length) {
        return router.replace("/create-profile");
      }
    },
    onError: (err: AxiosError<Response<null>>) => {
      setError({
        fieldErrors: { id: [err.response?.data?.result?.resultMessage || ""] },
      });
    },
  });
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
      const convertLowerCase = fields;
      mutateAsync(convertLowerCase);
    }

    setError({});
  };

  return (
    <GestureHandlerRootView className="bg-gray-600 h-screen w-full flex items-center pt-5 px-4">
      <Image
        className="flex-1"
        source={Images.logo}
        resizeMode="contain"
        style={{ width: 150, height: 140 }}
      />
      <View className="w-full flex-1 justify-between">
        <View className="space-y-3">
          {SigninFormField.map((field) => (
            <FormController
              disabled={isPending}
              key={field.id}
              control={control}
              name={field.name || ""}
              placeholder={field.name === "id" ? "아이디" : "비밀번호"}
              errors={error?.fieldErrors?.[field.name] || []}
            />
          ))}
          <ConfirmButton title="로그인" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
      <TermsSheet className="flex-1 justify-end pb-4" />
    </GestureHandlerRootView>
  );
};

export default SignIn;
