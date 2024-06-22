import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

const getImageUri = async (uri: string) => {
  let imageUri = uri;

  if (Platform.OS === 'ios' && imageUri.startsWith('ph://')) {
    const assetId = imageUri.replace('ph://', '');
    const iosFile = await MediaLibrary.getAssetInfoAsync(assetId);
    imageUri = iosFile.localUri || imageUri;
  }
  return imageUri;
};


export { getImageUri };