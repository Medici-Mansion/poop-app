import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import Header from "@/components/profile/Header";

const SelectPhotoLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" 
          options={{
            title: "",
            // headerLeft: () => <Header.LeftButton />,
            // headerRight: () => <Header.RightButton />,
            // headerStyle: { backgroundColor: "#161622" },
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default SelectPhotoLayout;
