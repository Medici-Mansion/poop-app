import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/select-photo/header";

const SelectPhotoLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" 
          options={{
            title: "",
            headerLeft: () => <Header />,
            headerStyle: { backgroundColor: "#161622" },
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default SelectPhotoLayout;
