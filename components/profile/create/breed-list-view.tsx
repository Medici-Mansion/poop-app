import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Breed, BreedsGroupedByConsonant } from '@/types';
import BreedItem from '@/components/profile/create/breed-list-item'

interface SearchBreedsProps {
  breeds: BreedsGroupedByConsonant;
  onSelect?: (breed: Breed) => void;
}

/** 
 * BreedListView
 * 견종 리스트 뷰
 * */ 
const BreedListView = (props: SearchBreedsProps) => {
  const { breeds = {}, onSelect = () => {} } = props;

  const handleBreedSelect = (breed: Breed) => {
    onSelect(breed);
  };

  return (
    <ScrollView className="px-4">
      {breeds &&
        Object.entries(breeds).map((item, idx) => {
          const [breedName, breedItems] = item || [];
          return (
            <View className="py-5 space-y-2" key={idx}>
              <Text className="text-white text-2xl">{breedName}</Text>
              <View className="last:pb-5">
                { breedItems?.map(breed => <BreedItem key={breed.id} breed={breed} onSelect={() => handleBreedSelect(breed)} /> )}
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default BreedListView;