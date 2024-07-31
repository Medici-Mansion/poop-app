
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import { ImageButton, MenuGroupList } from '@/components/my-profile/activity';

// TODO: 가상 데이터를 실제 데이터로 교체하기
const profileMockData = { id: 1, name: '돌돌이' };

export default function Activity() {
  return (
    <ScrollView className="w-full h-full flex-1 bg-gray-600 pt-12">
      <View className="px-4 flex flex-col items-center w-full h-full">
        <ImageButton className="mb-4" text="내 정보 수정" />
        <ImageButton text={profileMockData.name} key={profileMockData.id} />
        
        <MenuGroupList />
      </View>
    </ScrollView>
  )
};
