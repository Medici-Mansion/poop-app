import React, { useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Text,
} from "react-native";
import { useForm } from "react-hook-form";

import Images from "@/constants/Images";
import { signinFormSchema } from "@/schema";
import { SignInErrorType, Token } from "@/types";

import FormController from "@/components/form-controller";
import TermsSheet from "@/components/bottom-sheet/turms-sheet";
import { z } from "zod";
import useLogin from "@/hooks/user/use-login";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyProfileList, injectInterceptor, socialSignup } from "@/apis";
import { AxiosError } from "axios";
import { Response } from "@/types/server";
import { Button } from "@/components/ui";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import * as AppleAuthentication from "expo-apple-authentication";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { AnimatedPressable } from "@/components/ui/animate-pressable";
import { Apple, Google } from "@/assets/icons";

const SignIn = () => {
  const [error, setError] = useState<SignInErrorType>({});

  const { mutateAsync, isPending } = useLogin({
    onSuccess: async (data) => {
      const { accessToken } = data || {};
      await Promise.allSettled([AsyncStorage.setItem(Token.ACT, accessToken)]);
      injectInterceptor({ accessToken });

      const response = await getMyProfileList();

      if (!response.body.length) {
        return router.replace("/profile");
      }

      return router.replace("/profile-select");
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

  const { mutate } = useMutation({
    mutationKey: ["social"],
    mutationFn: socialSignup,
    async onSuccess(data, variables, context) {
      const { accessToken } = data || {};
      await Promise.allSettled([AsyncStorage.setItem(Token.ACT, accessToken)]);
      injectInterceptor({ accessToken });

      const response = await getMyProfileList();

      if (!response.body.length) {
        return router.replace("/profile");
      }

      return router.replace("/profile-select");
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

  const handleGoogleLogin = async () => {
    try {
      const service = await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      console.log(user);
      // const userInfo = await GoogleOneTapSignIn.signIn({
      //   webClientId: `autoDetect`, // works only if you use Firebase
      //   iosClientId: config.iosClientId, // only needed if you're not using Firebase
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-gray-600">
      <Pressable
        className="flex-1"
        onPress={(e) => {
          Keyboard.dismiss();
        }}
      >
        <Image
          className="w-[100px] h-[50px] mx-auto"
          style={{ marginTop: insets.top * 2, marginBottom: insets.bottom * 2 }}
          source={Images.logo}
          resizeMode="contain"
        />
        <KeyboardAvoidingView className="h-screen items-center w-full flex py-5 px-4 flex-1">
          <View className="w-full flex-1">
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
            </View>
            <Button
              disabled={isPending}
              label="로그인"
              onPress={handleSubmit(onSubmit)}
              className="mt-8"
            />
            <View className="mt-6 flex-row justify-center space-x-4 items-center">
              <AnimatedPressable>
                <Text className="text-body-b14 font-bold text-gray-200">
                  아이디 찾기
                </Text>
              </AnimatedPressable>
              <View className="h-full w-px bg-gray-400" />
              <AnimatedPressable>
                <Text className="text-body-b14 font-bold text-gray-200">
                  비밀번호 찾기
                </Text>
              </AnimatedPressable>
              <View className="h-full w-px bg-gray-400" />
              <TermsSheet />
            </View>
            <View className="flex-1 justify-end">
              <View className="flex-row items-center space-x-4 mb-6">
                <View className="flex-1 h-px bg-gray-400 " />
                <Text className="text-body-b14 text-gray-200 font-bold">
                  소셜 계정으로 시작
                </Text>
                <View className="flex-1 h-px bg-gray-400 " />
              </View>
              <View className="items-center flex-row justify-center space-x-4">
                <AnimatedPressable
                  className="rounded-full bg-white w-[60px] aspect-square items-center justify-center"
                  onPress={async () => {
                    try {
                      const credential = await AppleAuthentication.signInAsync({
                        nonce: "123123123",
                        requestedScopes: [
                          AppleAuthentication.AppleAuthenticationScope
                            .FULL_NAME,
                          AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                      });
                      mutate({
                        provider: "APPLE",
                        token: credential.identityToken ?? "",
                      });
                      // signed in
                    } catch (e) {
                      console.log(e, "<<<ee");
                      if (e.code === "ERR_REQUEST_CANCELED") {
                        // handle that the user canceled the sign-in flow
                      } else {
                        // handle other errors
                      }
                    }
                  }}
                >
                  <Apple />
                </AnimatedPressable>
                <AnimatedPressable
                  onPress={handleGoogleLogin}
                  className="rounded-full bg-white w-[60px] aspect-square items-center justify-center"
                >
                  <Google />
                </AnimatedPressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignIn;
