import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CreateHeader from "@/components/profile/create/header";
import MyProfileHeader from "@/components/profile/my-profile/header";

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
        <Stack.Screen name="my-profile" 
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
