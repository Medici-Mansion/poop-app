import React, { useState } from 'react';
import { consonantsList } from '@/constants';

import CarouselWrapper from '@/components/carousel-wrapper';
import ConsonantItem from '@/components/profile/create/consonant-item';

interface ConsonantCarouselProps {
  value: string;
  onSelect: (value: string) => void;
}

interface ConsonantItemProps {
  carouselRef: any;
  animationValue: any;
  item: any;
}

/** 
 * ConsonantCarousel
 * 모음 선택을 위한 수평 스크롤 캐러셀
 * */ 
export default function ConsonantCarousel(props: ConsonantCarouselProps) {
  const { value, onSelect } = props;
  const [searchKey, setSearchKey] = useState(value);

  const handleCarouselPress = (args: ConsonantItemProps) => {
    const { carouselRef, animationValue, item } = args;
    carouselRef?.current?.scrollTo({
      count: animationValue.value,
      animated: true,
    });
    setSearchKey(item.value);
    onSelect(item.value);
  };

  return (
    <>
    <CarouselWrapper data={consonantsList}>
      {({ item, animationValue, carouselRef }) => (
        <ConsonantItem
          animationValue={animationValue}
          label={item.value}
          selected={searchKey === item.value}
          onPress={() => handleCarouselPress({ carouselRef, animationValue, item })}
        />
      )}
    </CarouselWrapper>
  </>
  )
}


