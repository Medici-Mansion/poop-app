import React from 'react';
import { Pressable } from 'react-native';
import { router } from 'expo-router';

import { Ionicons, AntDesign } from '@expo/vector-icons';

/** 
 * HeaderRightButton
 * @description 설정 화면으로 이동하는 버튼
 * */ 
const HeaderRightButton = () => {
  return (
    <Pressable onPress={() => router.push('my-profile/settings')}>
      <AntDesign name="setting" size={24} color="white" />
    </Pressable>
  );
};

/** 
 * HeaderLeftButton
 * @description 메인 프로필 화면으로 이동하는 버튼
 * */ 
const HeaderLeftButton = () => {
  return (
    <Pressable onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={24} color="white" />
    </Pressable>
  );
};

const Header = {
  LeftButton: HeaderLeftButton,
  RightButton: HeaderRightButton,
};

export default Header;