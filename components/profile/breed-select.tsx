import { StyleSheet, ScrollView } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';;
import { Input } from '@/components/ui/input';
import { Dimensions } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import useDebounce from '@/hooks/use-debounce';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useBottomSheet } from "@/hooks/use-bottom-sheet";

const PAGE_WIDTH = 35;
const PAGE_HEIGHT = 50;

export default function breedSelect() {

  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet("50%");

  const width = Dimensions.get('window').width;
  const [picker, setPicker] = useState(false);
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const searchValue = useDebounce(searchInput, 500);

  const genders = useMemo(
    () => [
      { label: '암컷', value: 'FEMALE' },
      { label: '수컷', value: 'MALE' },
      { label: '선택안함', value: 'NONE' },
    ],
    [],
  );
  const { data: breeds } = useGetBreedds(searchKey, searchValue);

  return (
    <>
    <Input
      disabled={isPending}
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
    />
    <Portal>
      {isBreedsVisible && (
        <BottomSheet
          ref={ref}
          // index={}
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
              <Carousel
                ref={r}
                loop={false}
                style={{
                  width: width,
                  height: PAGE_HEIGHT,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#1C1C1C',
                }}
                data={consonantsList}
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                renderItem={({ item, animationValue }) => {
                  return (
                    <ConsonantCarousel
                      animationValue={animationValue}
                      label={item.value}
                      onPress={() => {
                        r.current?.scrollTo({
                          count: animationValue.value,
                          animated: true,
                        });
                        setSearchKey(item.value);
                      }}
                    />
                  );
                }}
              />
            </ScrollView>
            <SearchBreeds
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