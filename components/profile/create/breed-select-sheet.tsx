import React, { useImperativeHandle, useState } from 'react';
import { ScrollView, View} from 'react-native';
import { Portal } from 'react-native-portalize';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import useDebounce from '@/hooks/use-debounce';
import useGetBreeds from '@/hooks/use-get-breeds';
import { useBottomSheet } from "@/hooks/use-bottom-sheet";

import { Input } from '@/components/ui/input';
import { MaterialIcons } from '@expo/vector-icons';
import BreedListView from '@/components/profile/create/breed-list-view';
import ConsonantCarousel from '@/components/profile/create/consonant-carousel';

import type { Breed } from '@/types';

interface BreedSelectProps {
  onSelect: (breed: Breed) => void;
  breedRef: React.Ref<any>;
}


/** 
 * breedSelectSheet
 * 견종 선택을 위한 바텀시트
 * */ 
export default function breedSelectSheet(props: BreedSelectProps) {
  const { onSelect, breedRef } = props;
  const { hideBottomSheet, ref, snapPoints, showBottomSheet } = useBottomSheet("95%");

  const [selectedConsonant, setSelectedConsonant] = useState('');
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchValue = useDebounce(searchInput, 500);

  const { data: breeds } = useGetBreeds(selectedConsonant, searchValue);

  useImperativeHandle(breedRef, () => ({ 
    open: () => {
      setIsBreedsVisible(true);
      showBottomSheet();
    },
  }));

  const handleBreedSelect = (breed: Breed) => {
    onSelect(breed);
    hideBottomSheet();
  }

  return (
  <Portal>
    {isBreedsVisible && (
      <BottomSheet
        ref={ref}
        detached
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#121212' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <ScrollView className="py-4">
            <View className='relative px-3'>
              <Input
                className='px-3'
                placeholder="검색어를 입력하세요"
                placeholderTextColor={'#5D5D5D'}
                onChangeText={text => setSearchInput(text)}
              />
              <View className='absolute top-3 left-5'>
                <MaterialIcons name="search" size={24} color="#5D5D5D" />
              </View>
            </View>
            <ConsonantCarousel value={selectedConsonant} onSelect={setSelectedConsonant} />
          </ScrollView>
          <BreedListView
            breeds={breeds || {}}
            hideBottomSheet={hideBottomSheet}
            onSelect={handleBreedSelect}
          />
        </BottomSheetView>
      </BottomSheet>
    )}
  </Portal>
  )
}