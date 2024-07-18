import React, { useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
} from "react-native";
import { useForm } from "react-hook-form";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Images from "@/constants/Images";
import { signinFormSchema } from "@/schema";
import { SignInErrorType, Token } from "@/types";

import ConfirmButton from "@/components/confirm-button";
import FormController from "@/components/form-controller";
import TermsSheet from "@/components/bottom-sheet/turms-sheet";
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
  const { control, handleSubmit } = useForm({
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
    <GestureHandlerRootView className="bg-gray-600">
      <Pressable
        onPress={(e) => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView className="h-screen items-center w-full flex py-5 px-4">
          <Image
            className="flex-1"
            source={Images.logo}
            resizeMode="contain"
            style={{ width: 100, height: 50 }}
          />
          <View className="w-full flex-1 justify-between">
            <View className="space-y-3">
              <FormController
                disabled={isPending}
                control={control}
                name={"id"}
                placeholder={"아이디"}
                errors={error?.fieldErrors?.id || []}
              />
              <FormController
                disabled={isPending}
                control={control}
                name={"password"}
                placeholder={"비밀번호"}
                errors={error?.fieldErrors?.password || []}
                textInputProps={{
                  secureTextEntry: true,
                }}
              />
              <ConfirmButton
                disabled={isPending}
                title="로그인"
                onPress={handleSubmit(onSubmit)}
                className="mt-8"
              />
            </View>
          </View>
          <TermsSheet className="flex-1 justify-end pb-4 w-full" />
        </KeyboardAvoidingView>
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default SignIn;
