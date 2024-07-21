
import React from 'react';
import { View } from 'react-native';
import MenuGroup from '@/components/my-profile/common/menu-group';

interface MenuListProps {
  menuList: { title: string, items: { label: string }[] }[];
}

/**
 * MenuGroupList
 * @description 내 프로필의 활동, 설정 페이지의 메뉴 리스트
 */
export default function MenuGroupList(props: MenuListProps) {
  const { menuList } = props;

  return (
    <View className='w-full'>
      { 
        menuList.map((menu) => (
          <MenuGroup title={menu.title} items={menu.items} key={menu.title} />
        )) 
      }
    </View>
  )
};
