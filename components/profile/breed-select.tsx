import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { Portal } from 'react-native-portalize';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Filter from '@/components/profile/filter';
import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import useGetBreeds from '@/hooks/use-get-breeds';
import useDebounce from '@/hooks/use-debounce';
import { consonantsList } from '@/constants';

import { Input } from '@/components/ui/input';
import CarouselWrapper from '@/components/carousel-wrapper';
import ConsonantCarousel from '@/components/profile/consonant-carousel';
import BreedListView from '@/components/profile/breed-list-view';

import type { Breed } from '@/types'

export default function breedSelect() {

  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet("95%");

  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const searchValue = useDebounce(searchInput, 500);

  const { data: breeds } = useGetBreeds(searchKey, searchValue);

  return (
    <>
    <Filter 
    label='견종' 
    placeholder='견종 선택' 
    value={selectedBreed?.name || ''}
    onPress={(e) => {
      e.preventDefault();
      setIsBreedsVisible(true);
      showBottomSheet();
    }} />
    <Portal>
      {isBreedsVisible && (
        <BottomSheet
          ref={ref}
          detached
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: '#121212' }}
          handleIndicatorStyle={{
            backgroundColor: 'white',
          }}>
          <BottomSheetView style={{ flex: 1 }}>
            <ScrollView className="py-4">
              <Input
                className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C] text-[12px]"
                placeholder="검색어를 입력하세요"
                placeholderTextColor={'#5D5D5D'}
                onChangeText={text => setSearchInput(text)}
              />
              <CarouselWrapper data={consonantsList}>
                {/* TODO: ConsonantCarousel에 props를 바로 넘길 수 있게 수정하기 */}
                {({ item, animationValue, carouselRef }) => (
                  <ConsonantCarousel
                    animationValue={animationValue}
                    label={item.value}
                    onPress={() => {
                      carouselRef?.current?.scrollTo({
                          count: animationValue.value,
                          animated: true,
                        });
                      setSearchKey(item.value);
                    }}
                  />
                )}
              </CarouselWrapper>
            </ScrollView>
            <BreedListView
              breeds={breeds || {}}
              hideBottomSheet={hideBottomSheet}
              onSelect={(breed: Breed) => {
                setSelectedBreed(breed);
              }}
            />
          </BottomSheetView>
        </BottomSheet>
      )}
    </Portal>
  </>
  )
}