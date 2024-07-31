import React, { useImperativeHandle, useState, useCallback } from 'react';
import { ScrollView, View, Keyboard } from 'react-native';
import { Portal } from 'react-native-portalize';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import useDebounce from '@/hooks/use-debounce';
import useGetBreeds from '@/hooks/use-get-breeds';
import { useBottomSheet } from "@/hooks/use-bottom-sheet";

import { Input } from '@/components/my-profile/create/input';
import { MaterialIcons } from '@expo/vector-icons';
import BreedListView from '@/components/my-profile/create/breed-list-view';
import ConsonantCarousel from '@/components/my-profile/create/consonant-carousel';

import type { Breed } from '@/types';

interface BreedSelectProps {
  onSelect: (breed: Breed) => void;
  breedRef: React.Ref<any>;
  value?: string;
}


/** 
 * breedSelectSheet
 * 견종 선택을 위한 바텀시트
 * */ 
export default function breedSelectSheet(props: BreedSelectProps) {
  const { onSelect, breedRef, value = '' } = props;
  const { hideBottomSheet, ref, snapPoints, showBottomSheet } = useBottomSheet("95%");

  const [selectedConsonant, setSelectedConsonant] = useState(value);
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchValue = useDebounce(searchInput, 500);

  const { data: breeds } = useGetBreeds(selectedConsonant, searchValue);

  useImperativeHandle(breedRef, () => ({ 
    open: async () => {
      await Keyboard.dismiss();
      setIsBreedsVisible(true);
      showBottomSheet();
    },
  }));

  const handleBreedSelect = (breed: Breed) => {
    onSelect(breed);
    hideBottomSheet();
  }

  const handleSheetChange = useCallback((index: number) => {
    // 바텀시트가 닫히면 키보드를 내림
    if (index === -1) Keyboard.dismiss();
  }, []);

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
        onChange={handleSheetChange}
      >
        <BottomSheetView className="flex-1">
          <View className='relative px-3'>
            <Input
              inputClass='px-10'
              placeholder="검색어를 입력하세요"
              placeholderTextColor={'#5D5D5D'}
              onChangeText={setSearchInput}
            />
            <View className='absolute top-3 left-6'>
              <MaterialIcons name="search" size={24} color="#5D5D5D" />
            </View>
          </View>
          <ScrollView className="py-4" horizontal showsHorizontalScrollIndicator={false}>
            <ConsonantCarousel value={selectedConsonant} onSelect={setSelectedConsonant} />
          </ScrollView>
          <BreedListView
            breeds={breeds || {}}
            onSelect={handleBreedSelect}
          />
        </BottomSheetView>
      </BottomSheet>
    )}
  </Portal>
  )
}