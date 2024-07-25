import React from "react";
import { router } from "expo-router";
import { View, Text, Pressable, ViewProps } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { TERMS } from "@/constants";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import { Portal } from "react-native-portalize";
import { Button } from "../ui";

interface TermsSheetProps extends ViewProps {}

const TermsSheet = ({ ...viewProps }: TermsSheetProps) => {
  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet("50%");
  return (
    <View {...viewProps}>
      <Button variant="outlined" label="회원가입" onPress={showBottomSheet} />

      <Portal>
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
                <Button
                  label="동의하고 계속"
                  onPress={() => {
                    router.push("/sign-up");
                    hideBottomSheet();
                  }}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </View>
  );
};

export default TermsSheet;
