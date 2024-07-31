import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CreateHeader from "@/components/my-profile/create/header";
import UserHeader from "@/components/my-profile/user/header";

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="create"
          options={{
            title: "",
            headerLeft: () => <CreateHeader.LeftButton />,
            headerRight: () => <CreateHeader.RightButton />,
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
        <Stack.Screen
          name="user"
          options={{
            title: "",
            headerLeft: () => <UserHeader.LeftButton />,
            headerRight: () => <UserHeader.RightButton />,
            headerStyle: { backgroundColor: "#121212" },
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#121212" style="dark" />
    </>
  );
};

export default ProfileLayout;
