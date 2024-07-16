import React from 'react';
import { View, Text } from 'react-native';

/** 
 * UserActivitySummary
 * @description 유저의 게시물, 팔로우, 팔로잉 수를 보여주는 컴포넌트
 * */ 

// TODO: 데이터 연결하면서 props 수정하기
const UserActivitySummary = () => {
  return (
    <View className='flex-1 justify-center items-center mt-8'>
      <View className='flex flex-row justify-around items-center w-full'>
        <View className='flex-1 items-center'>
          <View className='h-10 justify-center items-center'>
            <Text className='text-white font-bold'>0</Text>
            <Text className='text-gray-200 mt-2'>게시물</Text>
          </View>
        </View>
        <View className='h-full w-px bg-gray-400' />
        <View className='flex-1 items-center'>
          <View className='h-10 justify-center items-center'>
            <Text className='text-white font-bold'>0</Text>
            <Text className='text-gray-200 mt-2'>팔로우</Text>
          </View>
        </View>
        <View className='h-full w-px bg-gray-400' />
        <View className='flex-1 items-center'>
          <View className='h-10 justify-center items-center'>
            <Text className='text-white font-bold'>0</Text>
            <Text className='text-gray-200 mt-2'>팔로잉</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  verticalLine: {
    borderRightWidth: 1,
    borderRightColor: '#9CA3AF',
  },
};

export default UserActivitySummary;
