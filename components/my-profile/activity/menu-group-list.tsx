
import React from 'react';
import { View } from 'react-native';
import MenuGroup from '@/components/my-profile/activity/menu-group';

// TODO: onPress시 페이지 이동 기능 연결하기
const MenuList = [
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

/**
 * MenuGroupList
 * @description 활동 페이지의 메뉴 리스트
 */
export default function MenuGroupList() {
  return (
    <View className='w-full'>
      { 
        MenuList.map((menu) => (
          <MenuGroup title={menu.title} items={menu.items} key={menu.title} />
        )) 
      }
    </View>
  )
};
