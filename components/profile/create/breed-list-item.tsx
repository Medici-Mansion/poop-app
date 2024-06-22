import React from 'react';
import { Text, Pressable, Image } from 'react-native';

import { Breed } from '@/types';

interface BreedItemProps {
  breed: Breed;
  onSelect: () => void;
}

/** 
 * BreedItem
 * 견종 리스트 아이템
 * */ 
const BreedItem = (props: BreedItemProps) => {
  const { breed, onSelect } = props;
  return (
    <Pressable onPress={onSelect} className="flex flex-row items-center gap-x-5">
      <Image source={{ uri: breed.avatar || '' }} className="w-10 h-10 rounded-full" />
      <Text className="text-white">{breed.name || ''}</Text>
    </Pressable>
  );
}


export default BreedItem;