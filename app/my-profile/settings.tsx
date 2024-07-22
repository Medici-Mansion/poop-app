
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import { MenuGroupList } from '@/components/my-profile/common';

// TODO: 가상 데이터를 실제 데이터로 교체하기
const menuList = [
  { 
    title: '게시물' , 
    items: [
      { label: '이용약관' }, 
      { label: '개인정보처리방침' }, 
      { label: '공지사항' }, 
      { label: '문의하기' },
      { label: '캐시데이터 삭제' },
      { label: '버전 업데이트' },
      { label: '로그아웃' },
      { label: '탈퇴' },
    ]
  },
];

export default function Settings() {
  return (
    <ScrollView className="w-full h-full flex-1 bg-gray-600">
      <View className="px-4 flex flex-col items-center w-full h-full">
        <MenuGroupList menuList={menuList} />
      </View>
    </ScrollView>
  )
};
