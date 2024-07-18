import { StatusBar } from "expo-status-bar";
import { Redirect } from "expo-router";
import { useUserStore } from "@/store/user";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const { isLogin } = useUserStore();
  // TODO: 테스트를 위해 임시로 redirect
  if (!isLogin) return <Redirect href="(auth)/sign-in" />;

  return (
    <SafeAreaView className="bg-background h-full">
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default index;
