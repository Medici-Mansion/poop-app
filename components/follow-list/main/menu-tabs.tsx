import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export type Tab = 'follower' | 'follow';

interface MenuTabProps {
  isActive: boolean;
  text: string;
  onPress: () => void;
  textClass?: string;
}

interface MenuTabsProps {
  tab: Tab;
  onTabPress?: (tab: Tab) => void;
}

/**
 * MenuTabs
 * @description 팔로우, 팔로워 탭
 */
const MenuTabs = (props: MenuTabsProps) => {
  const { tab, onTabPress = () => {} } = props;
  const [activeTab, setActiveTab] = useState<Tab>(tab);
  const isActive = (tab: Tab) => activeTab === tab;

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab);
    onTabPress(tab);
  };

  // TODO: 팔로워, 팔로우 수를 API로 받아와서 표시하되 너비 조정 필요
  return (
    <View className='flex flex-row justify-around w-full h-9 border-b-2 border-gray-400 mt-8'>
      <MenuTab isActive={isActive('follower')} text='팔로워 9' textClass='w-14' onPress={() => handleTabPress('follower')} />
      <MenuTab isActive={isActive('follow')} text='팔로우 5' textClass='w-14' onPress={() => handleTabPress('follow')} />
    </View>
  );
};

const MenuTab = ({ isActive, text, onPress, textClass }: MenuTabProps) => {
  const isActiveText = isActive ? 'text-white' : 'text-gray-200';

  return (
    <Pressable className={`flex-1 ${isActive}`} onPress={onPress}>
      <Text className={`mx-auto text-center body-b16 font-bold ${isActiveText} ${textClass}`}>
        {text}
      </Text>
      { isActive && <View className={`mx-auto h-0.5 bg-white mt-4 ${textClass}`}></View> }
    </Pressable>
  );
}


export default MenuTabs;