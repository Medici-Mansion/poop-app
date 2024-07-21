import React from 'react';
import { Pressable } from 'react-native';
import { router } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

/** 
 * HeaderLeftButton
 * @description 활동 화면으로 이동하는 버튼
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
};

export default Header;