
import { FlatList, View } from 'react-native'
import React from 'react'

import PhotoBox from './PhotoBox'

interface PhotoBoxListProps {
  photos: any[];
  onPress: (item: any) => void;
}

export default function PhotoBoxList(props: PhotoBoxListProps) {
  const { photos, onPress } = props;

  return (
    <View className='flex-9'>
      <FlatList
        data={photos}
        renderItem={({ item }) => <PhotoBox item={item} onPress={onPress} />}
        keyExtractor={(_, index) => `${index}`}
        numColumns={3}
      />
    </View>
  )
}