
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import { ImageButton, MenuGroupList } from '@/components/my-profile/activity';

// TODO: 가상 데이터를 실제 데이터로 교체하기
const profileMockData = { id: 1, name: '돌돌이' };

// TODO: onPress시 페이지 이동 기능 연결하기
const menuList = [
  { 
    title: '게시물' , 
    items: [{ label: '임시저장' }, { label: '좋아요' }, { label: '댓글' }, { label: '태그' }]
  },
  { 
    title: '친구 관리' , 
    items: [{ label: '차단한 계정' }, { label: '신고 내역' }]
  },
  { 
    title: '알림',
    items: [], // TODO: 알림의 메뉴 리스트 확인하기 
  }
];

export default function Activity() {
  return (
    <ScrollView className="w-full h-full flex-1 bg-gray-600 pt-12">
      <View className="px-4 flex flex-col items-center w-full h-full">
        <ImageButton className="mb-4" text="내 정보 수정" />
        <ImageButton text={profileMockData.name} key={profileMockData.id} />
        
        <MenuGroupList menuList={menuList} />
      </View>
    </ScrollView>
  )
};
