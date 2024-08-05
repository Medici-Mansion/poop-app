import {
  ImagePickerOptions,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";

import { getDataUriSize } from "@/lib/utils/";
import * as Toast from "@/components/views/util/toast";

export async function openPicker(opts?: ImagePickerOptions) {
  const response = await launchImageLibraryAsync({
    exif: false,
    mediaTypes: MediaTypeOptions.Images,
    quality: 1,
    ...opts,
    legacy: true,
  });

  if (response.assets && response.assets.length > 3) {
    Toast.show("You may only select up to 4 images");
  }

  return (response.assets ?? [])
    .slice(0, 3)
    .filter((asset) => {
      if (
        !asset.mimeType?.startsWith("image/") ||
        (!asset.mimeType?.endsWith("jpeg") &&
          !asset.mimeType?.endsWith("jpg") &&
          !asset.mimeType?.endsWith("png"))
      ) {
        Toast.show("Only image files are supported");
        return false;
      }
      console.log(asset);
      return true;
    })
    .map((image, _, arr) => {
      return {
        mime: "image/jpeg",
        height: image.height,
        width: image.width,
        path: image.uri,
        size: getDataUriSize(image.uri),
      };
    });
}
