import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView, Dimensions, Pressable, Text } from 'react-native';
import { Portal } from 'react-native-portalize';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import useGetBreeds from '@/hooks/use-get-breeds';
import useDebounce from '@/hooks/use-debounce';
import { consonantsList } from '@/constants';

// TODO: 재사용 input 컴포넌트 연결하면서 수정
// import { Input } from '@/components/ui/input';
import CarouselWrapper from '@/components/carousel-wrapper';
import ConsonantCarousel from '@/components/profile/consonant-carousel';
import BreedListView from '@/components/profile/breed-list-view';

const PAGE_WIDTH = 35;
const PAGE_HEIGHT = 50;

interface BreedSelectProps {
  children: React.ReactElement;
}

export default function breedSelect(props: BreedSelectProps) {
  const { children } = props;
  const carouselRef = useRef<ICarouselInstance>(null);

  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet("50%");

  const width = Dimensions.get('window').width;

  const [value, setValue] = useState({});
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const searchValue = useDebounce(searchInput, 500);

  const { data: breeds } = useGetBreeds(searchKey, searchValue);

  return (
    <>
    {/* <Input
      disabled={false}
      onOuterPressIn={() => {
        setIsBreedsVisible(true);
        showBottomSheet();
      }}
      onPressIn={() => {
        setIsBreedsVisible(true);
        showBottomSheet();
      }}
      label="견종"
      placeholder="견종 선택"
      placeholderTextColor={'#5D5D5D'}
      editable={false}
      value={value.name || ''}
    /> */}
    <Pressable>
      <Text
        onPress={() => {
          setIsBreedsVisible(true);
          showBottomSheet();
        }}
        className="text-white text-[12px] border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C]">
        {value.name || '견종 선택'}
      </Text>
    </Pressable>
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
              {/* <Input
                className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C] text-[12px]"
                placeholder="검색어를 입력하세요"
                placeholderTextColor={'#5D5D5D'}
                onChangeText={text => setSearchInput(text)}
              /> */}
              <Text>
                검색어를 입력하세요
              </Text>
              <CarouselWrapper data={consonantsList}>
                {/* TODO: ConsonantCarousel에 props를 바로 넘길 수 있게 수정하기 */}
                {({ item, animationValue, carouselRef }) => (
                  <ConsonantCarousel
                    animationValue={animationValue}
                    label={item.value}
                    onPress={() => {
                      carouselRef.current?.scrollTo({
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
              onSelect={setValue}
            />
          </BottomSheetView>
        </BottomSheet>
      )}
    </Portal>
  </>
  )
}

const styles = StyleSheet.create({})