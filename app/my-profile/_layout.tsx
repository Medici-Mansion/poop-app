import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CreateHeader from "@/components/my-profile/create/header";
import MainHeader from "@/components/my-profile/main/header";
import { Header as ActivityHeader } from "@/components/my-profile/activity";

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
            headerLeft: () => <MainHeader.LeftButton />,
            headerRight: () => <MainHeader.RightButton />,
            headerStyle: { backgroundColor: "#161622" },
          }} 
        />
        <Stack.Screen name="activity" 
          options={{
            title: "활동",
            headerLeft: () => <ActivityHeader.LeftButton />,
            headerRight: () => <ActivityHeader.RightButton />,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
          }} 
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default ProfileLayout;
