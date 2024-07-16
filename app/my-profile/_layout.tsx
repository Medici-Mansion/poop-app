import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CreateHeader from "@/components/my-profile/create/header";
import MyProfileHeader from "@/components/my-profile/main/header";

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="create" 
          options={{
            title: "",
            headerLeft: () => <CreateHeader.LeftButton />,
            headerRight: () => <CreateHeader.RightButton />,
            headerStyle: { backgroundColor: "#161622" },
          }} 
        />
        <Stack.Screen name="main" 
          options={{
            title: "",
            headerLeft: () => <MyProfileHeader.LeftButton />,
            headerRight: () => <MyProfileHeader.RightButton />,
            headerStyle: { backgroundColor: "#161622" },
          }} 
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default ProfileLayout;
