import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ViewContextProvider } from '@/providers/view-context-provider';

import { Header as MainHeader } from "@/components/other-profile/user";

const ProfileLayout = () => {
  return (
    <>
      <ViewContextProvider>
        <Stack>
          <Stack.Screen
            name="user"
            options={{
              title: "",
              headerLeft: () => <MainHeader.LeftButton />,
              headerRight: () => <MainHeader.RightButton />,
              headerStyle: { backgroundColor: "#121212" },
            }}
          />
        </Stack>
      </ViewContextProvider>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default ProfileLayout;
