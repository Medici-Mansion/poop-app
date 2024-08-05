import * as MediaLibrary from "expo-media-library";
import { Platform } from "react-native";
import { ContentImage } from ".";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const getImageUri = async (uri: string) => {
  let imageUri = uri;

  if (Platform.OS === "ios" && imageUri.startsWith("ph://")) {
    const assetId = imageUri.replace("ph://", "");
    const iosFile = await MediaLibrary.getAssetInfoAsync(assetId);
    imageUri = iosFile.localUri || imageUri;
  }
  return imageUri;
};

async function getImageData(content: ContentImage): Promise<ContentImage> {
  switch (Platform.OS) {
    case "ios":
      const iosFile = await CameraRoll.iosGetImageDataById(content.uri);
      return { ...iosFile.node.image, uri: iosFile.node.image.filepath! };
    case "android":
    default:
      throw new Error("Not Support.");
  }
}

export { getImageUri, getImageData };
