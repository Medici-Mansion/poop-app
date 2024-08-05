import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ViewContextProvider } from '@/providers/view-context-provider';

import { Header as CreateHeader } from "@/components/my-profile/create";
import { Header as UserHeader } from "@/components/my-profile/user";
import { Header as ActivityHeader } from "@/components/my-profile/activity";
import { Header as SettingsHeader } from "@/components/my-profile/settings";

const ProfileLayout = () => {
  return (
    <>
      <ViewContextProvider>
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
              headerStyle: { backgroundColor: "#161622" },
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
          <Stack.Screen name="activity" 
            options={{
              title: "활동",
              headerLeft: () => <ActivityHeader.LeftButton />,
              headerRight: () => <ActivityHeader.RightButton />,
              headerStyle: { backgroundColor: "#161622" },
              headerTitleStyle: { color: "white" },
            }} 
          />
          <Stack.Screen name="settings" 
            options={{
              title: "설정",
              headerLeft: () => <SettingsHeader.LeftButton />,
              headerStyle: { backgroundColor: "#161622" },
              headerTitleStyle: { color: "white" },
            }} 
          />
        </Stack>
      </ViewContextProvider>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default ProfileLayout;
