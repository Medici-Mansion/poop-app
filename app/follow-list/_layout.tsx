import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ViewContextProvider } from '@/providers/view-context-provider';

import { Header as MainHeader } from "@/components/follow-list/main";

const ProfileLayout = () => {
  return (
    <>
      <ViewContextProvider>
        <Stack>
          <Stack.Screen name="main" 
            options={{
              title: "꼼데(임시)", // TODO: 내 프로필 혹은 상대 프로필 이름으로 변경
              headerLeft: () => <MainHeader.LeftButton />,
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
