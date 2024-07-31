import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useViewContext } from '@/providers/view-context-provider';

import Feather from '@expo/vector-icons/Feather';
import { Entypo } from '@expo/vector-icons';

/** 
 * HeaderRightButton
 * @description 메뉴 버튼
 * */ 
const HeaderRightButton = () => {
  return (
    <Pressable onPress={() => router.push('my-profile/activity')}>
      <Feather name="menu" size={24} color="white" />
    </Pressable>
  );
};

/** 
 * HeaderRightButton
 * @description 등록된 프로필이 있을 때, 프로필명을 보여주는 버튼
 * */ 
const HeaderLeftButton = () => {
  const { setAction } = useViewContext();

  return (
    // TODO: PROFILE_SELECT_SHEET은 별도 action 상수로 관리
    <View>
      <Pressable 
        className='flex-row items-center'
        onPress={() => setAction('PROFILE_SELECT_SHEET')}
      >
        <Text className='mr-1 body-b/16 font-bold text-white'>프로필명</Text>
        <Entypo name="chevron-down" size={18} color="white" />
      </Pressable>
    </View>
  );
};

const Header = {
  LeftButton: HeaderLeftButton,
  RightButton: HeaderRightButton,
};

export default Header;