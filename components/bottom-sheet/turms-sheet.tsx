import React, { useCallback, useRef, useState } from "react";
import { router } from "expo-router";
import { View, Text, Pressable, ViewProps } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { TERMS } from "@/constants";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import { Portal } from "react-native-portalize";
import { Button } from "../ui";
import { AnimatedPressable } from "../ui/animate-pressable";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutRight,
} from "react-native-reanimated";
import { ArrowRight } from "@/assets/icons";
import { Form, Field, FormInstance } from "houseform";
import { CheckBox } from "@/assets/icons/checkbox";
import { z } from "zod";
interface TermsSheetProps extends ViewProps {}

const TermsSheet = ({ ...viewProps }: TermsSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet("60%");

  const formRef = useRef<FormInstance>(null);

  const handleSheetClose = useCallback(() => {
    hideBottomSheet();
    ref.current?.close();
    setIsOpen(false);
    formRef.current?.reset();
  }, []);
  return (
    <View {...viewProps}>
      <AnimatedPressable
        onPress={() => {
          setIsOpen(true);
          showBottomSheet();
        }}
      >
        <Text className="text-body-b14 font-bold text-gray-200">회원가입</Text>
      </AnimatedPressable>

      <Portal>
        {isOpen && (
          <Pressable
            onPress={handleSheetClose}
            className="absolute w-screen h-screen -z-10"
          >
            <Animated.View
              entering={FadeIn.duration(350)}
              exiting={FadeOut.duration(350)}
              className=" bg-black/60  w-screen h-screen"
            />
          </Pressable>
        )}
        <BottomSheet
          onAnimate={(from) => setIsOpen(from === -1)}
          ref={ref}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: "#121212" }}
          handleIndicatorStyle={{
            backgroundColor: "#595959",
            marginVertical: 6,
            width: 32,
          }}
        >
          <BottomSheetView>
            <Form
              ref={formRef}
              onSubmit={() => {
                router.push("/sign-up");
                hideBottomSheet();
                formRef.current?.reset();
              }}
            >
              {({ submit, value, formFieldsRef }) => (
                <View className="px-4 py-8 space-y-12">
                  <Text className="text-white font-semibold text-head4-sb21">
                    풉을 시작하려면 동의가 필요해요
                  </Text>
                  <View className="flex flex-row items-center space-x-4">
                    <CheckBox
                      checked={Object.values(value).every(Boolean)}
                      onPress={() => {
                        formFieldsRef.current.forEach((ref) =>
                          (ref as any).setValue(() => true)
                        );
                      }}
                    />
                    <Text className="text-white text-body1-b18">전체 동의</Text>
                  </View>
                  {TERMS.map((item) => {
                    return (
                      <Field
                        name={item.id + ""}
                        initialValue={false}
                        onChangeValidate={z.any().refine(
                          (val) => {
                            return val === true;
                          },
                          {
                            message: "약관에 동의가 필요해요",
                          }
                        )}
                      >
                        {({ value, setValue, errors }) => (
                          <View
                            className="relative flex flex-row items-center mt-8 space-x-4"
                            key={item.id}
                          >
                            <CheckBox
                              checked={value}
                              onPress={() => {
                                setValue(!value);
                              }}
                            />
                            <View className="relative justify-between flex flex-row items-center flex-1">
                              <Text className="text-white text-body1-b18">
                                {item.title}
                              </Text>
                              {item.pressable && (
                                <AnimatedPressable>
                                  <ArrowRight />
                                </AnimatedPressable>
                              )}
                              {errors.map((err) => (
                                <Animated.Text
                                  entering={FadeInRight}
                                  exiting={FadeOutRight}
                                  className="absolute top-full text-body5-m14 text-system-red"
                                  key={err}
                                >
                                  {err}
                                </Animated.Text>
                              ))}
                            </View>
                          </View>
                        )}
                      </Field>
                    );
                  })}
                  <Button label="동의하고 계속" onPress={submit} />
                </View>
              )}
            </Form>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </View>
  );
};

export default TermsSheet;
