import { ScrollView } from "react-native-gesture-handler";
import { View, KeyboardAvoidingView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useViewContext } from '@/providers/view-context-provider';

import { Content, MenuTabs, MenuTabType, ProfileImageBox, UserActivitySummary } from '@/components/common/profile';
import { ControlButtons, ProfileDashboardSheet } from '@/components/other-profile/user';

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

export default function MainPage() {
  const [currentTab, setCurrentTab] = useState<MenuTabType>('toon');
  const [isFollowing, setIsFollowing] = useState(false);

  const { action, setAction } = useViewContext();
  const profileDashboardSheet = useRef(null);

  useEffect(() => {
    // header에서 발생한 action 처리
    if (action === 'PROFILE_DASHBOARD_SHEET') {
      profileDashboardSheet.current?.show();
      setAction('');
    }
  }, [action]);


  return (
    <KeyboardAvoidingView className="w-full h-full bg-gray-600">
      <ScrollView>
        {/* 상대 프로필 정보 - 요약 영역 */}
        <View className="px-4 h-80 flex flex-col py-8 items-center w-full mt-8">
          <ProfileImageBox uri={userInfo.avatarUrl} name={userInfo.name} />
          <UserActivitySummary />
          <ControlButtons isFollowing={isFollowing} onPress={setIsFollowing} />
        </View>

        {/* 상대 프로필 정보 - 툰, 챌린지 영역 */}
        <MenuTabs tab={currentTab} onTabPress={setCurrentTab} />
        <Content tab={currentTab} />
      </ScrollView>
      <ProfileDashboardSheet ref={profileDashboardSheet} />
    </KeyboardAvoidingView>
  )
};
