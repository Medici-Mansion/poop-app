import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/my-profile/common';


interface ControlButtonsProps {
  isFollowing: boolean;
  onPress?: (b: boolean) => void;
}

/** 
 * ControlButtons
 * @description 친구 끊기, 팔로우 버튼
 * */ 
export default function ControlButtons(props: ControlButtonsProps) {
  const { isFollowing, onPress =(b)=> {} } = props;
  return (
  <View className='flex-1 mt-4 w-full pl-4 pr-4'> 
    <View className='flex flex-row w-full'>
      <View className='flex-1'>
        {
          isFollowing ? 
          // TODO: 발바닥 아이콘 추가하기
          <Button 
            className="bg-gray-400" 
            label="친구 끊기" 
            textStyle={{ color: '#d5d5d5', fontWeight: 'bold' }} 
            onPress={() => onPress(false)} 
            /> 
          :
          <Button 
            className="bg-white" 
            label="팔로우" 
            textStyle={{ color: 'black', fontWeight: 'bold' }} 
            onPress={() => onPress(true)} 
          />
        }
      </View>
    </View>
  </View>
  )
};
