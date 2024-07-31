import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import ProfileImageBox from '@/components/my-profile/common/profile-image-box';
import UserActivitySummary from '@/components/my-profile/common/user-activity-summary';
import ControlButtons from '@/components/my-profile/user/control-buttons';

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

export default function UserProfile() {
  return (
    <SafeAreaView className="w-full h-full bg-gray-600">
        <ScrollView className="w-full h-full flex-1">
          <View className="px-4 flex flex-col py-10 items-center w-full h-full">
            <ProfileImageBox uri={userInfo.avatarUrl} name={userInfo.name} />
            <UserActivitySummary />
            <ControlButtons />
          </View>

          {/* TODO: 툰/ 챌린지 영역 */}
        </ScrollView>
    </SafeAreaView>
  )
};
