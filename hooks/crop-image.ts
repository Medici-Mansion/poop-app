import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

async function getImageData(content) {
  switch (Platform.OS) {
    case 'ios':
      const assetId = content.uri.replace('ph://', '');
      const iosFile = await MediaLibrary.getAssetInfoAsync(assetId);
      const base64 = await FileSystem.readAsStringAsync(iosFile.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return { ...content, uri: `data:image/jpeg;base64,${base64}` };

    case 'android':
      const androidFile = await FileSystem.getInfoAsync(content.uri);
      return { ...content, uri: androidFile.uri };

    default:
      throw new Error('Not Supported.');
  }
}

const handleSelectImage = (item) => async () => {
    const image = await getImageData(item);
    const croppedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!croppedImage.canceled) {
      image.uri = croppedImage.uri;
      setImage(image);
      router.back();
    }
  };