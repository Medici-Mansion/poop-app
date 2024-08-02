import { SignupFormList } from "@/constants/form-filed";
import useCheckVerify from "@/hooks/user/use-check-verify";
import useGetVerifyCode from "@/hooks/user/use-get-verify-code";
import useSignup from "@/hooks/user/use-signup";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignupParam, Verify } from "@/types";
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
import FormField from "@/components/form-field";
import { PhoneNumberInput } from "@/components/phone-number-input";
import { VerifyCodeInput } from "@/components/verify-code-input";
import { useMutation } from "@tanstack/react-query";
import { checkUserIdDuplicated } from "@/apis";
import CustomDateTimeSheet from "@/components/my-profile/create/date-time-sheet";
import { PasswordConfirmInput } from "@/components/password-confirm-input";
import { PasswordInput } from "@/components/password-input";
import { UserIdInput } from "@/components/user-id-input";

const signupFormFieldList = [
  "userId",
  "password",
  "passwordConfirm",
  "birthday",
  "phone",
] as const;

type SignupFormFields = (typeof signupFormFieldList)[number];

const Signup = () => {
  const bottomSheetRef = useRef<{ show: () => void; hide: () => void }>(null);
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

  /**
   * 생년월일, 휴대폰 번호 사라지는 현상으로 인해,
   * submit 직전 복사용 ref
   */
  const compSignupParam = useRef<SignupParam | null>(null);

  const form = useForm<{ [key in SignupFormFields]: string }>({
    defaultValues: {
      userId: "",
      password: "",
      passwordConfirm: "",
      birthday: "",
      phone: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  /**
   * 인증번호 재요청하기
   */
  const { mutate: getVerifyCode } = useGetVerifyCode({
    onError: (err) => console.log(err),
  });
  // const getVerifyParam: VerifyParam = {
  //   type: Verify.PHONE,
  //   vid: compSignupParam.current?.phone || "",
  // };

  const { mutate: signupMutate } = useSignup({
    onSuccess: (data, vars) => {
      setStep((prev) => 5);
    },
    onError: (err) => {
      form.setError("phone", {
        type: "validate",
        message: "이미 사용중인 휴대폰 번호에요.",
      });
    },
  });

  const onSubmit = (values: SignupParam) => {
    compSignupParam.current = { ...values };
    signupMutate(values);
  };

  const { mutate: checkVerifyCode, isError } = useCheckVerify({
    onSuccess: () => {
      /**
       * 인증 완료
       */
      router.replace("/profile/main");
    },
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
  });

  const { mutate: checkDuplicateUserId, isSuccess: nicknameSuccess } =
    useMutation({
      mutationKey: ["search", "nickname"],
      mutationFn: (newNickname: string) => checkUserIdDuplicated(newNickname),
      gcTime: Infinity,
      onSuccess(response) {
        const { body } = response;
        if (body) {
          setStep(1);
          form.setFocus(signupFormFieldList[1]);
          return;
        }
      },
      onError(error: any) {
        if (error.response.status === 419) {
          form.setError("userId", {
            type: "validate",
            message: "사용중인 아이디에요. 다시 입력해주세요.",
          });
          return;
        }
        form.setError("userId", {
          type: "validate",
          message: "서버에 문제가 생겼어요.",
        });
      },
    });

  const onValidateKeyboardTopButtonClick = async () => {
    form
      .trigger(["birthday", "userId", "password", "passwordConfirm", "phone"])
      .then(async (value) => {
        if (!value) return;
        switch (step) {
          case 0:
            if (step === 0) {
              checkDuplicateUserId(form.getValues("userId"));
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
    <FormProvider {...form}>
      <Pressable
        className="flex-1"
        onPress={() => {
          bottomSheetRef.current?.hide?.();
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
            <Text className="text-white font-bold text-2xl pb-10 flex flex-col justify-between">
              {SignupFormList[step]?.title}
            </Text>
            <View style={{ flex: 1 }}>
              <VerifyCodeInput
                onSubmitEditing={onValidateKeyboardTopButtonClick}
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
                  <PhoneNumberInput
                    onSubmitEditing={onValidateKeyboardTopButtonClick}
                    step={step}
                    disabled={step >= 5}
                  />
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
                {step >= 2 ? (
                  <PasswordConfirmInput
                    onSubmitEditing={onValidateKeyboardTopButtonClick}
                    step={step}
                  />
                ) : null}
                {step >= 1 ? (
                  <PasswordInput
                    onSubmitEditing={onValidateKeyboardTopButtonClick}
                    step={step}
                  />
                ) : null}
                <UserIdInput
                  onSubmitEditing={onValidateKeyboardTopButtonClick}
                  isSuccess={nicknameSuccess}
                  step={step}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          <Controller
            control={form.control}
            name={"birthday"}
            disabled={step >= 5}
            render={({ field }) => (
              <CustomDateTimeSheet
                ref={bottomSheetRef}
                date={field.value}
                onConfirm={(selectedDate) => {
                  field.onChange(selectedDate);
                  step === 3 && onValidateKeyboardTopButtonClick();
                }}
              />
            )}
          />
        </GestureHandlerRootView>

        {step !== 5 ? (
          <KeyboardAccessoryView hideBorder androidAdjustResize>
            {({ isKeyboardVisible }) => (
              <View>
                {isKeyboardVisible && (
                  <Button
                    size={"lg"}
                    className="w-full"
                    disabled={
                      !form?.getFieldState(signupFormFieldList[step]).isDirty ||
                      !!form?.formState?.errors?.[signupFormFieldList[step]]
                    }
                    label={step === 4 ? "인증 번호 보내기" : "확인"}
                    onPress={onValidateKeyboardTopButtonClick}
                  />
                )}
              </View>
            )}
          </KeyboardAccessoryView>
        ) : (
          <KeyboardAccessoryView hideBorder androidAdjustResize>
            {({ isKeyboardVisible }) => (
              <View>
                {isKeyboardVisible && (
                  <Button
                    size={"lg"}
                    className="w-full"
                    label={"확인"}
                    onPress={() => {
                      formHandler.current?.handleSubmit((value) =>
                        checkVerifyCode({
                          ...value,
                          vid: compSignupParam.current?.phone || "",
                        })
                      )();
                    }}
                  />
                )}
              </View>
            )}
          </KeyboardAccessoryView>
        )}
      </Pressable>
    </FormProvider>
  );
};

export default Signup;
