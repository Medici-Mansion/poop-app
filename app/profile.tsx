import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import React from "react";

const Profile = () => {
  return (
    <SafeAreaView className="bg-background h-full">
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
