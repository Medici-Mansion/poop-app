import * as MediaLibrary from "expo-media-library";
import { Alert } from "@/components/views/util/alert";
import { Linking } from "react-native";

const openPermissionAlert = (perm: string) => {
  Alert.alert(
    "Permission needed",
    `Bluesky does not have permission to access your ${perm}.`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Open Settings", onPress: () => Linking.openSettings() },
    ]
  );
};

export function usePhotoLibraryPermission() {
  const [res, requestPermission] = MediaLibrary.usePermissions({
    granularPermissions: ["photo"],
  });
  const requestPhotoAccessIfNeeded = async () => {
    if (res?.granted) {
      return true;
    } else if (!res || res.status === "undetermined" || res?.canAskAgain) {
      const { canAskAgain, granted, status } = await requestPermission();

      if (!canAskAgain && status === "undetermined") {
        openPermissionAlert("photo library");
      }

      return granted;
    } else {
      openPermissionAlert("photo library");
      return false;
    }
  };
  return { requestPhotoAccessIfNeeded };
}
