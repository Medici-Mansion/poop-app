import React from 'react';
import { View, FlatList } from 'react-native';
import Thumbnail from '@/components/ui/thumbnail';

const challengeList = [
  { title: '우리집 강아지 핵쩐다', number: 1, subTitle: '엽기' },
  { title: '우리집 강아지 핵쩐다2', number: 200, subTitle: '엽기' },
  { title: '우리집 강아지 핵쩐다3', number: 3, subTitle: '엽기' },
];

/**
 * ChallengeList
 * @description 챌린지 리스트 컴포넌트입니다.
 */
const ChallengeList = () => {
  const handleEndReached = () => {
    console.log('end reached'); 
  }
  
  return (
    <View className='w-full'>
      <FlatList
        data={challengeList}
        numColumns={1}
        renderItem={({ item, index }) => (
        <Thumbnail 
          key={index} 
          title={item.title} 
          size='lg' 
          number={item.number}
          subTitle={item.subTitle}
          style={{ width: '100%' }} 
          /> 
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        scrollEnabled={false}
      />
    </View>
  );
}

export default ChallengeList;