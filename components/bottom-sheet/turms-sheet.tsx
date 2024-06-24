import React from "react";
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { TERMS } from "@/constants";
import { AnimatedPressable } from "@/components/ui/animate-pressable";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";

const TermsSheet = () => {
  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet("50%");
  return (
    <>
      <AnimatedPressable onPress={showBottomSheet} className="w-full">
        <View className="flex flex-row justify-center border border-gray-300 rounded-2xl mb-5">
          <Text className="text-white font-bold py-4 w-full text-center">
            회원가입
          </Text>
        </View>
      </AnimatedPressable>
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#121212" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <BottomSheetView>
          <View className="px-4 space-y-2 flex flex-col justify-evenly h-full">
            <View className="flex justify-center py-6 ">
              <Text className="text-white font-bold text-[18px]">
                풉을 시작하려면 동의가 필요해요
              </Text>
            </View>
            <View className="space-y-6">
              {TERMS.map((item) => {
                return (
                  <View
                    className="pt-2 flex flex-row justify-between items-center"
                    key={item.id}
                  >
                    <View className="flex flex-row items-center">
                      <Text className="text-white ml-2 text-[12px]">
                        {item.title}
                      </Text>
                    </View>
                    <Pressable className="pr-2"></Pressable>
                  </View>
                );
              })}
            </View>
            <View className="pb-3">
              <Pressable
                className="bg-white py-3 rounded-2xl flex items-center justify-center"
                onPress={() => {
                  router.push("/sign-up");
                  hideBottomSheet();
                }}
              >
                <Text className="text-black font-bold text-center">
                  동의하고 계속
                </Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default TermsSheet;
