import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import ProfileImageBox from '@/components/my-profile/common/profile-image-box';
import UserActivitySummary from '@/components/my-profile/common/user-activity-summary';
import { ControlButtons } from '@/components/my-profile/main';
import MenuTabs, { Tab } from '@/components/my-profile/main/menu-tabs';
import Content from '@/components/my-profile/main/content';

// TODO: 데스트 데이터
const userInfo = {
  id: '1',
  createdAt: '2021-08-01',
  updatedAt: '2021-08-01',
  avatarUrl: '',
  gender: 'F',
  name: '테스트',
  breedId: '1',
  birthday: '2021-08-01',
}

export default function MyProfile() {
  const [currentTab, setCurrentTab] = useState<Tab>('toon');
  return (
    <ScrollView className="w-full h-full bg-gray-600 pt-8">
      {/* 내 프로필 정보 - 요약 영역 */}
      <View className="px-4 h-80 flex flex-col py-8 items-center w-full">
        <ProfileImageBox uri={userInfo.avatarUrl} name={userInfo.name} />
        <UserActivitySummary />
        <ControlButtons />
      </View>

      {/* 내 프로필 정보 - 툰, 챌린지 영역 */}
      <MenuTabs tab={currentTab} onTabPress={setCurrentTab} />
      <Content tab={currentTab} />
    </ScrollView>
  )
};
