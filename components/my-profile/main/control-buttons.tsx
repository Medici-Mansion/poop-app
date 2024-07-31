import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Button from '@/components/my-profile/common/button';

/** 
 * ControlButtons
 * @description 프로필 편집, 북마크 버튼
 * */ 
export default function ControlButtons() {
  return (
  <View className='flex-1 mt-4 w-full pl-4 pr-4'> 
    <View className='flex flex-row w-full'>
      <View className='flex-1 mr-2'>
        <Button className="bg-gray-400" label="프로필 편집" textStyle={{ color: 'white' }} />
      </View>
      <View className='w-1/3'>
        <Button className="bg-gray-400" label={<Feather name="bookmark" size={16} color="white" />} />
      </View>
    </View>
  </View>
  )
};
