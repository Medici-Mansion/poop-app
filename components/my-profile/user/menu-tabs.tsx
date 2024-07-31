import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export type Tab = 'toon' | 'challenge';

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
 * @description 툰, 챌린지 탭
 */
const MenuTabs = (props: MenuTabsProps) => {
  const { tab, onTabPress = () => {} } = props;
  const [activeTab, setActiveTab] = useState<Tab>(tab);
  const isActive = (tab: Tab) => activeTab === tab;

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab);
    onTabPress(tab);
  };

  return (
    <View className='flex flex-row justify-around w-full h-9 border-b-2 border-gray-400'>
      <MenuTab isActive={isActive('toon')} text='툰' textClass='w-4' onPress={() => handleTabPress('toon')} />
      <MenuTab isActive={isActive('challenge')} text='챌린지' textClass='w-10' onPress={() => handleTabPress('challenge')} />
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
      { isActive && <View className={`mx-auto h-0.5 bg-white mt-5 ${textClass}`}></View> }
    </Pressable>
  );
}


export default MenuTabs;