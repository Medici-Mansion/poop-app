import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import Event from "@/constants/RouteEvent";
import { useProfileStore } from "@/store/profile";
import { useNavigation } from "expo-router";

/**
 * HeaderRightButton
 * 프로필 등록 버튼
 * 프로필 정보가 모두 입력되었을 때 활성화
 * */
const HeaderRightButton = () => {
  const navigation = useNavigation();
  const { profile } = useProfileStore();

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { avatar, name, birthday, gender, breed } = profile;
    setIsValid(!!avatar && !!name && !!birthday && !!gender && !!breed);
  }, [profile]);

  const handlePress = () => {
    navigation.navigate("create", { event: Event["PROFILE:CREATE"] });
  };

  return (
    <Pressable onPress={handlePress} disabled={!isValid}>
      <Text className={`font-bold ${isValid ? "text-white" : "text-gray-300"}`}>
        만들기
      </Text>
    </Pressable>
  );
};

/**
 * HeaderLeftButton
 * 뒤로가기 버튼
 * */
const HeaderLeftButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
    </Pressable>
  );
};

const Header = {
  LeftButton: HeaderLeftButton,
  RightButton: HeaderRightButton,
};

export default Header;
