import React from "react";
import { Stack } from "expo-router";

import Header from "@/components/profile/create/header";

const ProfileLayout = () => {
  return (
    <Stack initialRouteName="main">
      <Stack.Screen
        name="main"
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
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
    </Stack>
  );
};

export default ProfileLayout;
