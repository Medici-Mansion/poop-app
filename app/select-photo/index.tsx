import React, { useEffect, useCallback, useState } from 'react';
import { View, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import PhotoBox from '@/components/select-photo/PhotoBox';
import BottomLoader from '@/components/select-photo/BottomLoader';
import { getImageUri } from '@/utils/image';

import useGridItemCount from '@/hooks/use-grid-item-count';

const IMAGE_HEIGHT = 120;
const COLUMN = 3;

const SelectPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const { count, calculate } = useGridItemCount({ itemHeight: IMAGE_HEIGHT, column: COLUMN });

  const handleSelectImage = (item) => async () => {
    // const image = await getImageUri(item.uri);
    // const croppedImage = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 1,
    // });

    // if (!croppedImage.canceled) {
    //   image.uri = croppedImage.uri;
    //   setImage(image);
    //   router.back();
    // }
  };

  const selectImage = async (value) => {
    setImage(image);
    // onImageSelect(image);
  };

  const getPhotos = useCallback(async (cursor = null) => {
    if (loading) return;

    setLoading(true);
    try {
      const { assets, endCursor, hasNextPage: nextPageAvailable } = await MediaLibrary.getAssetsAsync({
        first: count.current,
        mediaType: 'photo',
        sortBy: MediaLibrary.SortBy.creationTime,
        after: cursor ?? undefined,
      });
  
      const formattedAssets = await Promise.all(
        assets.map(async (asset) => {
          const uri = await getImageUri(asset.uri);
          return {
            uri,
            filename: asset.filename || asset.uri.split('/').pop(),
            fileExtension: asset.filename?.split('.').pop() || null,
            sourceType: 'local',
          };
        })
      );
  
      setPhotos(prev => [...(prev ?? []), ...formattedAssets]);
      setHasNextPage(nextPageAvailable);
      setNextCursor(endCursor);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    init();
  }, []);


  const init = async () => {
    await calculate();
    getPhotos();
  }

  const handleEndReached = () => {
    if (hasNextPage) getPhotos(nextCursor);
  }

  return (
    <View className='flex-1 bg-black h-full'>
      <View className='flex-1 flex-row justify-between items-center p-3'>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color="white" />
        </Pressable>
      </View>
      <View style={{ flex: COLUMN * COLUMN }}>
        <FlatList
          data={photos}
          renderItem={({item}) => PhotoBox({ item, onPress: handleSelectImage, height: IMAGE_HEIGHT, column: COLUMN })}
          keyExtractor={(_, index) => `${index}`}
          numColumns={COLUMN}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={BottomLoader(loading)}
        />
      </View>
    </View>
  );
};

export default SelectPhoto;
