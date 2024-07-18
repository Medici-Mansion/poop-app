import { DatePickerSheet } from "@/components/bottom-sheet/date-picker-sheet";
import { SignupFormList } from "@/constants/form-filed";
import useCheckVerify from "@/hooks/user/use-check-verify";
import useGetVerifyCode from "@/hooks/user/use-get-verify-code";
import useSignup from "@/hooks/user/use-signup";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignupParam, Verify, VerifyParam } from "@/types";
import React, { useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { View, Text, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedPressable } from "@/components/ui/animate-pressable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import {
  NicknameInput,
  PasswordInput,
  PasswordConfirmInput,
} from "./_components";
import FormField from "@/components/form-field";
import { PhoneNumberInput } from "./_components/phone-number-input";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { VerifyCodeInput } from "./_components/verify-code-input";
import { useMutation } from "@tanstack/react-query";
import { checkNicknameDuplicated } from "@/apis";

const signupFormFieldList = [
  "nickname",
  "password",
  "passwordConfirm",
  "birthday",
  "phone",
] as const;

type SignupFormFields = (typeof signupFormFieldList)[number];

const Signup = () => {
  const bottomSheetRef = useRef<{ show: () => void; close: () => void }>(null);
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const formHandler = useRef<UseFormReturn<
    {
      code: string;
      vid: any;
      type: Verify;
    },
    any,
    undefined
  > | null>();

  const form = useForm<{ [key in SignupFormFields]: string }>({
    defaultValues: {
      nickname: "",
      password: "",
      passwordConfirm: "",
      birthday: "",
      phone: "",
    },
    mode: "onChange",
  });

  const { mutateAsync: getVerifyCode } = useGetVerifyCode({
    onError: (err) => console.log(err),
  });

  const { mutate: signupMutate } = useSignup({
    onSuccess: (data) => {
      const getVerifyParam: VerifyParam = {
        type: Verify.PHONE,
        vid: form.getValues("phone"),
      };
      getVerifyCode(getVerifyParam);
      setStep((prev) => 5);
    },
    onError: (err) => console.log(err, "<<<<< signupMutate errpr"),
  });

  const onSubmit = (values: SignupParam) => {
    signupMutate(values);
  };

  const { mutate: checkVerifyCode, isError } = useCheckVerify({
    onSuccess: () => {
      /**
       * 인증 완료
       */
    },
  });

  const { mutateAsync: checkDuplicateNickname, isSuccess: nicknameSuccess } =
    useMutation({
      mutationKey: ["search", "nickname"],
      mutationFn: (newNickname: string) => checkNicknameDuplicated(newNickname),
      gcTime: Infinity,
      onSuccess() {},
      onError() {
        form.setError("nickname", {
          type: "validate",
          message: "중복되는 닉네임이에요. 다시 입력해주세요.",
        });
      },
    });

  const onValidateKeyboardTopButtonClick = async () => {
    form
      .trigger(["birthday", "nickname", "password", "passwordConfirm", "phone"])
      .then(async (value) => {
        if (!value) return;
        switch (step) {
          case 0:
            if (step === 0) {
              await checkDuplicateNickname(form.getValues("nickname"));
              setStep(1);
              form.setFocus(signupFormFieldList[1]);
            }
            break;
          case 1:
            if (!form.formState.errors.password) {
              setStep(2);
              form.setFocus(signupFormFieldList[2]);
            }
            break;
          case 2:
            const { password, passwordConfirm } = form.getValues();
            if (password !== passwordConfirm) {
              return form.setError("passwordConfirm", {
                message: "비밀번호가 일치하지 않아요. 다시 입력해주세요.",
                type: "validate",
              });
            }
            setStep(3);
            form.setFocus(signupFormFieldList[3]);
            break;
          case 3:
            setStep(4);
            form.setFocus(signupFormFieldList[4]);
            break;
          case 4:
            form.handleSubmit(onSubmit)();
            break;
        }
      });
  };

  return (
    <BottomSheetModalProvider>
      <Pressable
        className="flex-1"
        onPress={() => {
          bottomSheetRef.current?.close();
        }}
      >
        <GestureHandlerRootView
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
          className="bg-gray-600"
        >
          <AnimatedPressable
            onPress={() => {
              router.back();
            }}
            className="px-4 pb-4"
          >
            <Ionicons name="chevron-back" size={25} color="white" />
          </AnimatedPressable>
          <KeyboardAwareScrollView
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="never"
            automaticallyAdjustsScrollIndicatorInsets
            className="flex-grow p-4"
            extraScrollHeight={-200}
          >
            <FormProvider {...form}>
              <Text className="text-white font-bold text-2xl pb-10 flex flex-col justify-between">
                {SignupFormList[step]?.title}
              </Text>
              <View style={{ flex: 1 }}>
                <VerifyCodeInput
                  formHandler={formHandler}
                  isError={isError}
                  step={step}
                />
                <View
                  className="space-y-16"
                  style={{
                    marginTop: step === 5 ? 64 : 0,
                  }}
                >
                  {step >= 4 ? (
                    <PhoneNumberInput step={step} disabled={step >= 5} />
                  ) : null}
                  {step >= 3 ? (
                    <View>
                      <FormField
                        disabled={step >= 5}
                        key="signup-birthday-input"
                        onPress={() => {
                          bottomSheetRef.current?.show();
                        }}
                        value={form.watch().birthday}
                        onBlur={() => {}}
                        showSoftInputOnFocus={false}
                        setPicker={() => {}}
                        placeholder="생년월일"
                        label={step > 3 ? "생년월일" : ""}
                        returnKeyType="next"
                        className={"text-body-b14 font-bold"}
                      />
                    </View>
                  ) : null}
                  {step >= 2 ? <PasswordConfirmInput step={step} /> : null}
                  {step >= 1 ? <PasswordInput step={step} /> : null}
                  <NicknameInput isSuccess={nicknameSuccess} step={step} />
                </View>
              </View>
              <Controller
                control={form.control}
                name={"birthday"}
                disabled={step >= 5}
                render={({ field }) => (
                  <DatePickerSheet
                    sheetRef={bottomSheetRef}
                    setValue={(selectedDate) => {
                      field.onChange(selectedDate);
                      step === 3 && onValidateKeyboardTopButtonClick();
                    }}
                  />
                )}
              />
            </FormProvider>
          </KeyboardAwareScrollView>
        </GestureHandlerRootView>
        {step !== 5 ? (
          <KeyboardAccessoryView avoidKeyboard hideBorder>
            <Button
              size={"lg"}
              disabled={
                !form?.getFieldState(signupFormFieldList[step]).isDirty ||
                !!form?.formState?.errors?.[signupFormFieldList[step]]
              }
              label={step === 4 ? "인증 번호 보내기" : "확인"}
              onPress={onValidateKeyboardTopButtonClick}
            />
          </KeyboardAccessoryView>
        ) : (
          <KeyboardAccessoryView avoidKeyboard hideBorder>
            <Button
              size={"lg"}
              disabled={
                !formHandler.current?.getFieldState("code").isDirty ||
                !!formHandler.current?.formState?.errors?.code
              }
              label={"확인"}
              onPress={() =>
                formHandler.current?.handleSubmit((value) =>
                  checkVerifyCode(value)
                )()
              }
            />
          </KeyboardAccessoryView>
        )}
      </Pressable>
    </BottomSheetModalProvider>
  );
};

export default Signup;
