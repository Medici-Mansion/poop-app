import DatePickerSheet from "@/components/bottom-sheet/date-picker-sheet";
import ConfirmButton from "@/components/confirm-button";
import FormController from "@/components/form-controller";
import { SignupFormList } from "@/constants/form-filed";
import useCheckVerify from "@/hooks/user/use-check-verify";
import useGetVerifyCode from "@/hooks/user/use-get-verify-code";
import useSignup from "@/hooks/user/use-signup";
import { router } from "expo-router";
import { getSignupFormSchemaForStep } from "@/schema";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignUpErrorType, Verify, VerifyParam } from "@/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Signup = () => {
  const [error, setError] = useState<SignUpErrorType>({});
  const [isFocus, setIsFocus] = useState(false);
  const [picker, setPicker] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [step, setStep] = useState(0);
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      id: "",
      nickname: "",
      password: "",
      birthday: "",
      phone: "",
      email: "",
      gender: "",
      code: "",
    },
  });

  const { mutateAsync: signupMutate } = useSignup({
    onSuccess: (data) => {
      const getVerifyParam: VerifyParam = {
        type: getValues("email") === "" ? Verify.PHONE : Verify.EMAIL,
        vid:
          getValues("email") === ""
            ? getValues("phone")
            : getValues("email").toLowerCase(),
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

  const phoneOrEmailFieldCheck = () => {
    isEmail ? setValue("phone", "") : setValue("email", "");
  };

  const onSubmit = async (fields: any) => {
    if (step >= 7) return;
    phoneOrEmailFieldCheck();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const schema = getSignupFormSchemaForStep(step, fields);
    const result = await schema.safeParseAsync(fields);
    if (!result.success) {
      setError(result.error.flatten());
      return;
    } else {
      const { email, phone, code } = fields || {};
      const emailToLowerCase = email.toLowerCase();
      const getVerifyParam: VerifyParam = {
        type: email === "" ? Verify.PHONE : Verify.EMAIL,
        vid: email === "" ? phone : emailToLowerCase,
      };
      if (step === 5) {
        delete fields.code;
        console.log({ ...fields, email: email.toLowerCase() });
        signupMutate({ ...fields, email: email.toLowerCase() });
        return;
      }
      if (step === 6) {
        checkVerifyCode({ ...getVerifyParam, code });
      }
      setStep((prev) => prev + 1);
      setError({});
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsFocus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsFocus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{}}
          className="bg-gray-600 py-20 px-10"
        >
          <Pressable onPress={() => router.back()}>
            <Text className="text-white pb-4">Back</Text>
          </Pressable>
          <Text className="text-white font-bold text-2xl pb-10 flex flex-col justify-between">
            {SignupFormList[step]?.title}
          </Text>
          <View style={{ flex: 1 }}>
            {SignupFormList.slice(0, step + 1)
              .reverse()
              .map((field) => (
                <FormController
                  key={field.id}
                  control={control}
                  name={
                    field.name === "phone" && isEmail ? "email" : field.name
                  }
                  placeholder={field.placeholder || ""}
                  errors={error?.fieldErrors?.[field.name] || []}
                  setPicker={setPicker}
                  setValue={setValue}
                  isEmail={isEmail}
                  setIsEmail={setIsEmail}
                />
              ))}
          </View>
          {step === 4 && (
            <View className="">
              <ConfirmButton title="확인" onPress={handleSubmit(onSubmit)} />
            </View>
          )}
        </KeyboardAwareScrollView>
        {isFocus && (
          <View>
            <ConfirmButton title="확인" onPress={handleSubmit(onSubmit)} />
          </View>
        )}
      </KeyboardAvoidingView>
      {picker && (
        <DatePickerSheet
          setPicker={setPicker}
          setValue={setValue}
          setStep={setStep}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default Signup;
