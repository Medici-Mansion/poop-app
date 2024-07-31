import React from 'react';
import ReactNaive, { View, Text, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import Images from "@/constants/Images";

// TODO: 공통 컴포넌트로 분리하면서 디자인 시스템 맞추기
interface ImageButtonProps extends ReactNaive.ViewProps {
  text: string;
  image?: string;
  rightButton?: React.ReactNode;
};

/**
 * ImageButton
 * @description 이미지와 텍스트를 보여주는 버튼
 */
export default function ImageButton(props: ImageButtonProps) {
  const { image = '', text, rightButton = '', ...rest } = props;

  return (
    <View 
      className="w-full flex flex-row items-center justify-between p-6 bg-gray-500 rounded-3xl"
      {...rest}
    >
      <View className="flex flex-row items-center">
        {
          image ? 
            <View className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-700'>
              <Image
                className='w-5 h-5'
                source={{ uri: image }}
                resizeMode="contain"
              />
            </View>
            : 
            <View className='flex items-center justify-center w-9 h-9 rounded-full bg-gray-700'>
              <Image
                className='w-5 h-5'
                source={Images.poopIcon}
              />
            </View>
        }
        <Text className="ml-4 text-base font-bold text-white">{text}</Text>
      </View>
      <View className="flex flex-row items-center">
        {
          rightButton ? rightButton : <Feather name="chevron-right" size={24} color="white" />
        }
      </View>
    </View>
  );
};
