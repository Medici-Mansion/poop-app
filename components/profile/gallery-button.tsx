import { Pressable, Image } from 'react-native'
import React from 'react'

import { MaterialIcons } from '@expo/vector-icons';

interface GalleryButtonProps {
  image?: string;
}


export default function GalleryButton(props: GalleryButtonProps) {
  const { image = '' } = props;
  return (
    <Pressable className="flex items-center justify-center w-20 h-20 bg-gray-500 rounded-full">
      {image ? (
        <Image
          source={{ uri: image }}
          className="object-cover -z-10 w-20 h-20 rounded-full"
        />
      )
      : <MaterialIcons name="insert-photo" size={24} color="white" />
    }
    </Pressable>
  )
}