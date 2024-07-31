import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

interface PhotoPickerReturns {
  pickImage: () => void;
  image: ImagePicker.ImagePickerAsset | ImagePicker.ImagePickerAsset[] | null;
}

interface PhotoPickerProps {
  option?: ImagePicker.ImagePickerOptions;
  onPick?: (image: ImagePicker.ImagePickerAsset | ImagePicker.ImagePickerAsset[]) => void;
}

/**
 * usePhotoPicker
 * @description 이미지 선택 후 이미지를 반환하는 훅
 * @param option 
 *  option: allowsMultipleSelection, allowsEditing, quality, ....
 *  docs: https://docs.expo.dev/versions/latest/sdk/imagepicker/#imagepickeroptions
 */
const usePhotoPicker = (props: PhotoPickerProps): PhotoPickerReturns => {
  const { option = {}, onPick = () => {} } = props;
  const [image, setImage] = useState<PhotoPickerReturns['image']>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      ...option,
    });

    if (!result.canceled) {
      const image = option.allowsMultipleSelection ? result.assets : result.assets[0];
      setImage(image);
      onPick(image);
    }
  };
  return {
    pickImage,
    image,
  }
}

export default usePhotoPicker;