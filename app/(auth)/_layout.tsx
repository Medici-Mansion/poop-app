import { Stack } from "expo-router";

import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="(service)"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(service)" />
      <Stack.Screen name="profile-select" />
    </Stack>
  );
}
