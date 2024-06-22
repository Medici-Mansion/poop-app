import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useGallery } from '@/hooks/use-gallery';

import PhotoBox from '@/components/select-photo/PhotoBox';
import BottomLoader from '@/components/select-photo/BottomLoader';
import { getImageUri, selectImage } from '@/utils/image';

const COLUMN = 3;

const SelectPhoto = () => {
  const [photo, setPhoto] = useState(null);
  const { loadNextPagePictures, photos, hasNextPage, isLoading } = useGallery({
    pageSize: 20,
  });

  const handleSelectImage = (item) => async () => {
    selectImage(async (croppedImage) => {
      setPhoto(croppedImage);
    });
  };

  
  const handleEndReached = () => {
    if (hasNextPage) loadNextPagePictures();
  }

  const renderItem = ({ item }) => (
    <PhotoBox item={item} onPress={handleSelectImage(item)} column={COLUMN} />
  );

  return (
    <View className='flex-1 bg-black h-full'>
      <View style={{ flex: COLUMN * COLUMN }}>
        <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={(_, index) => `${index}`}
          numColumns={COLUMN}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={BottomLoader(isLoading)}
        />
      </View>
    </View>
  );
};

export default SelectPhoto;
