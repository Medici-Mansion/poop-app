import React from 'react';
import { Pressable, Text } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

/** 
 * HeaderRightButton
 * @description 메뉴 버튼
 * */ 
const HeaderRightButton = () => {
  return (
    <Pressable>
      <Feather name="menu" size={24} color="white" />
    </Pressable>
  );
};

/** 
 * HeaderRightButton
 * @description 등록된 프로필이 있을 때, 프로필명을 보여주는 버튼
 * */ 
const HeaderLeftButton = () => {
  return (
    <Pressable>
      <Text>프로필명</Text>
    </Pressable>
  );
};

const Header = {
  LeftButton: HeaderLeftButton,
  RightButton: HeaderRightButton,
};

export default Header;