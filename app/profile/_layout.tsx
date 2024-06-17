// app/profile/_layout.tsx

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/profile/Header";

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="create" 
          options={{
            title: "",
            headerLeft: () => <Header.LeftButton />,
            headerRight: () => <Header.RightButton />,
            headerStyle: { backgroundColor: "dark" },
          }} 
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default ProfileLayout;
