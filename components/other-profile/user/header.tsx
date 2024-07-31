import React from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { useViewContext } from '@/providers/view-context-provider';

import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';

/** 
 * HeaderRightButton
 * @description  버튼
 * */ 
const HeaderRightButton = () => {
  const { setAction } = useViewContext();
  
  return (
    <View>
      {/* TODO: PROFILE_DASHBOARD_SHEET은 별도 action 상수로 관리 */}
      <Pressable 
        className='flex-row items-center'
        onPress={() => setAction('PROFILE_DASHBOARD_SHEET')}
      >
        <Feather name="more-horizontal" size={24} color="white" />
      </Pressable>
    </View>
  );
};

/** 
 * HeaderLeftButton
 * @description 뒤로 이동하기 버튼
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