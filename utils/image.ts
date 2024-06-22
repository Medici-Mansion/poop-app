import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

const getImageUri = async (uri: string) => {
  let imageUri = uri;

  if (Platform.OS === 'ios' && imageUri.startsWith('ph://')) {
    const assetId = imageUri.replace('ph://', '');
    const iosFile = await MediaLibrary.getAssetInfoAsync(assetId);
    imageUri = iosFile.localUri || imageUri;
  }
  return imageUri;
};

const selectImage = async (onCompleted) => {
  const croppedImage = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!croppedImage.canceled) {
    onCompleted(croppedImage);
  }
}


export { getImageUri, selectImage };