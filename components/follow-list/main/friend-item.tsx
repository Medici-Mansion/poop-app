import React from 'react';
import { View, Text, Image, Pressable, ViewProps } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface FriendItemProps extends ViewProps {
  name: string;
  id: string;
  uri: string;
  isFollowing?: boolean | undefined;
  handleFollow: (id: string) => void;
}

/**
 * FriendItem
 * @description 팔로우 리스트의 친구 아이템
 */ 
const FriendItem = (props: FriendItemProps) => {
  const { 
    name, 
    id, 
    uri = '', 
    isFollowing = undefined,
    handleFollow = () => {},
    ...rest
  } = props;

  return (
    <View 
      className='flex flex-row items-center w-full h-10' 
      {...rest}
    >
      <View className='flex flex-row items-center w-full justify-between'>
        {/* TODO: 프로필 주소가 유효하지 않은 경우 케이스 체크 */}
        <View className='flex flex-row items-center'>
          {
            uri ? <Image
            source={uri}
            className='w-10 h-10 rounded-full'
            resizeMode="contain"
          /> : <View className='w-10 h-10 rounded-full bg-gray-400'></View>
          }
          <View className='ml-4'>
            <Text className='text-white body-b16 font-bold leading-4'>{name}</Text>
            <Text className='text-gray-200 text-xs leading-4'>@{id}</Text>
          </View>
        </View>
        {
          isFollowing !== undefined && (
            <Pressable onPress={() => handleFollow(id)}>
              {/* TODO: 아이콘 교체하기 */}
              {
                isFollowing 
                ? <FontAwesome name="check-circle" size={24} color="white" /> 
                : <Pressable>
                    <Text className='text-gray-200 body-b16 font-bold'>팔로우</Text>
                  </Pressable>
              }
            </Pressable>
          )
        }
      </View>

    </View>
  );
};

export default FriendItem;