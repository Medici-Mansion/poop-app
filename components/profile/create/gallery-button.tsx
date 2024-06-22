import React from 'react'
import { Pressable, Image, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

interface GalleryButtonProps {
  image?: string;
  onPress?: () => void;
}

/**
 * GalleryButton
 * 프로필 사진 변경 버튼
 **/ 
export default function GalleryButton(props: GalleryButtonProps) {
  const { image = '', onPress } = props;
  return (
    <Pressable 
      onPress={onPress}
      className="flex relative items-center justify-center w-20 h-20 bg-gray-500 rounded-full"
    >
      {image && (
        <Image
          source={{ uri: image }}
          className="object-cover -z-10 w-20 h-20 rounded-full"
        />
      )
    }
    <View className='absolute'>
      <MaterialIcons name="insert-photo" size={24} color="white" />
    </View>
    </Pressable>
  )
}