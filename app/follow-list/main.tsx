
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import { MenuTabs, MenuTabType } from '@/components/follow-list/main';

export default function MainPage() {
  const [tab, setTab] = React.useState<MenuTabType>('follower');
  return (
    <ScrollView className="w-full h-full flex-1 bg-gray-600">
      <MenuTabs tab={tab} onTabPress={setTab} />
      <View className="px-4 flex flex-col items-center w-full h-full">
      </View>
    </ScrollView>
  )
};
