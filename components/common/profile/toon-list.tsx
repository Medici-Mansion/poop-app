import React from 'react';
import { View, FlatList } from 'react-native';
import Thumbnail from '@/components/ui/thumbnail';

const toon = [
  { title: '우리집 강아지 핵쩐다' },
  { title: '우리집 강아지 핵쩐다2' },
  { title: '우리집 강아지 핵쩐다3' },
  { title: '우리집 강아지 핵쩐다4' },
  { title: '우리집 강아지 핵쩐다5' },
];

/**
 * ToonList
 * @description 툰 리스트 컴포넌트입니다.
 */
const ToonList = () => {
  const handleEndReached = () => {
    console.log('end reached'); 
  }
  
  return (
    <View className='w-full'>
      <FlatList
        data={toon}
        numColumns={2}
        renderItem={({ item, index }) => (<Thumbnail key={index} title={item.title} style={{ width: '49%' }} />)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        scrollEnabled={false}
      />
    </View>
  );
}

export default ToonList;