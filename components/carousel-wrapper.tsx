import React, { useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { SharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const PAGE_WIDTH = 35;
const PAGE_HEIGHT = 50;

type CarouselRefType = ICarouselInstance | null;

type ChildrenProps<T> = {
  item: T;
  animationValue: SharedValue<number>;
  carouselRef: React.MutableRefObject<CarouselRefType>;
};

interface CarouselWrapperProps<T> {
  data: T[];
  children: (props: ChildrenProps<T>) => React.ReactElement;
}

/**
 * CarouselWrapper
 * 아이템(children)을 캐러셀로 변경하는 Wrapper
 * */
export default function CarouselWrapper<T>(props: CarouselWrapperProps<T>) {
  const { children, data = [], ...rest } = props;
  const carouselRef = useRef<CarouselRefType>(null);

  return (
    <Carousel
      ref={carouselRef}
      loop={false}
      style={styles.carousel}
      data={data}
      width={PAGE_WIDTH}
      height={PAGE_HEIGHT}
      renderItem={({ item, animationValue }) =>
        children({ item, animationValue, carouselRef })
      }
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  carousel: {
    width: Dimensions.get("window").width,
    height: PAGE_HEIGHT,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1C",
  },
});
