import DatePickerSheet from "@/components/bottom-sheet/date-picker-sheet";
import ConfirmButton from "@/components/confirm-button";
import { SignupFormList } from "@/constants/form-filed";
import useCheckVerify from "@/hooks/user/use-check-verify";
import useGetVerifyCode from "@/hooks/user/use-get-verify-code";
import useSignup from "@/hooks/user/use-signup";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Verify, VerifyParam } from "@/types";
import React, { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedPressable } from "@/components/ui/animate-pressable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormField from "@/components/form-field";
import { Button } from "@/components/ui";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import debounce from "lodash/debounce";
import { checkNicknameDuplicated } from "@/apis";
import {
  UndefinedInitialDataOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

const Signup = () => {
  const insets = useSafeAreaInsets();
  const [picker, setPicker] = useState(false);
  const [step, setStep] = useState(0);
  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      nickname: "",
      password: "",
      passwordConfirm: "",
      birthday: "",
      phone: "",
    },
  });

  const { mutateAsync: signupMutate } = useSignup({
    onSuccess: (data) => {
      const getVerifyParam: VerifyParam = {
        type: Verify.PHONE,
        vid: getValues("phone"),
      };

      getVerifyCode(getVerifyParam);
      setStep((prev) => prev + 1);
    },
    onError: (err) => console.log(err, "<<<<< signupMutate errpr"),
  });
  const { mutateAsync: getVerifyCode } = useGetVerifyCode({
    onError: (err) => console.log(err),
  });
  const { mutateAsync: checkVerifyCode } = useCheckVerify({
    onSuccess: () => {
      router.replace("/sign-in");
    },
  });

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["search", "nickname"],
    mutationFn: (newNickname: string) => checkNicknameDuplicated(newNickname),
    gcTime: Infinity,
    onSuccess() {
      setStep((prev) => (prev === 0 ? 1 : prev));
    },
  });

  const onValidateKeyboardTopButtonClick = () => {
    switch (step) {
      case 0:
        mutate(getValues().nickname);
        break;
      case 1:
        setStep((prev) => prev + 1);
        break;
      case 2:
        setStep((prev) => prev + 1);
        break;
    }
  };

  const checkNicknameFn = useCallback(
    debounce((nickname) => {
      if (!nickname) return;
      mutate(nickname);
    }, 1000),
    []
  );

  return (
    <View className="flex-1">
      <GestureHandlerRootView
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        className="bg-gray-600 py-0 px-4"
      >
        <AnimatedPressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={25} color="white" />
        </AnimatedPressable>
        <KeyboardAwareScrollView
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustKeyboardInsets
        >
          <View className="py-8">
            <Text className="text-white font-bold text-2xl pb-10 flex flex-col justify-between">
              {SignupFormList[step]?.title}
            </Text>
            <View style={{ flex: 1 }} className="space-y-16">
              {step >= 2 ? (
                <View>
                  <Controller
                    disabled={step !== 2}
                    control={control}
                    name={"passwordConfirm"}
                    render={({ field }) => (
                      <FormField
                        {...field}
                        onChangeText={(event) => {
                          field.onChange(event);
                        }}
                        secureTextEntry
                        placeholder="비밀번호 확인"
                        blurOnSubmit
                        returnKeyType="next"
                        className={"text-body-b14 font-bold"}
                      />
                    )}
                  />
                </View>
              ) : null}
              {step >= 1 ? (
                <View>
                  <Controller
                    disabled={step !== 1}
                    control={control}
                    name={"password"}
                    render={({ field }) => (
                      <FormField
                        {...field}
                        onChangeText={(event) => {
                          field.onChange(event);
                        }}
                        secureTextEntry
                        placeholder="비밀번호"
                        blurOnSubmit
                        returnKeyType="next"
                        className={"text-body-b14 font-bold"}
                      />
                    )}
                  />
                </View>
              ) : null}

              {step >= 0 ? (
                <View>
                  <Controller
                    disabled={step !== 0}
                    control={control}
                    name={"nickname"}
                    render={({ field: { ref, ...field } }) => (
                      <FormField
                        {...field}
                        onChangeText={(event) => {
                          checkNicknameFn(event);
                          field.onChange(event);
                        }}
                        hint={
                          step === 0
                            ? "띄어쓰기 없이 영문 2~12자로 입력해주세요."
                            : ""
                        }
                        label={step !== 0 ? "닉네임" : ""}
                        placeholder="닉네임"
                        blurOnSubmit
                        returnKeyType="next"
                        className={"text-body-b14 font-bold"}
                      />
                    )}
                  />
                </View>
              ) : null}
            </View>
            {step === 4 && (
              <View className="">
                <ConfirmButton title="확인" onPress={() => {}} />
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        {picker && (
          <DatePickerSheet
            setPicker={setPicker}
            setValue={(selectedDate) => setValue("birthday", selectedDate)}
            setStep={setStep}
          />
        )}
      </GestureHandlerRootView>
      <KeyboardAccessoryView avoidKeyboard hideBorder>
        <View>
          <Button
            label="확인"
            onPress={onValidateKeyboardTopButtonClick}
          ></Button>
        </View>
      </KeyboardAccessoryView>
    </View>
  );
};

export default Signup;
