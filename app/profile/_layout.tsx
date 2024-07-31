import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/profile/create/header";
import { View } from "react-native";
const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          title: "",
          headerLeft: () => <Header.LeftButton />,
          headerRight: () => <Header.RightButton />,
          headerStyle: { backgroundColor: "#121212" },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="main"
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
