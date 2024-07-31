import React from 'react';
import { View, Text, Image, Pressable, PressableProps } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ProfileItemProps extends PressableProps {
  name: string;
  id: string;
  uri: string;
  isSelected: boolean;
  handleCheck: (id: string) => void;
}

/**
 * ProfileItem
 * @description profile-select-sheet의 프로필 선택 아이템
 */ 
const ProfileItem = (props: ProfileItemProps) => {
  const { 
    name, 
    id, 
    uri = '', 
    isSelected, 
    handleCheck = () => {},
    ...rest
  } = props;

  return (
    <Pressable 
      className='flex flex-row items-center w-full h-10' 
      onPress={() => handleCheck(id)}
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
        <Pressable>
          {/* TODO: 아이콘 교체하기 */}
          {
            isSelected 
            ? <FontAwesome name="check-circle" size={24} color="white" /> 
            : <FontAwesome name="check-circle-o" size={24} color="#595959" />
          }
        </Pressable>
      </View>

    </Pressable>
  );
};

export default ProfileItem;