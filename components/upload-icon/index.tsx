import { AnimatedPressable } from "@/components/ui/animate-pressable";
import { usePhotoLibraryPermission } from "@/hooks/use-permission";
import { openPicker } from "@/lib/utils/media/picker.shared";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Popover from "react-native-popover-view";
import { Mode } from "react-native-popover-view/dist/Types";
import { Image as ExpoImage } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { compressIfNeeded } from "@/lib/utils/media/image.shared";
import { Challenge, Plus, PlusActive, Write } from "@/assets/icons";
import { useToonImage } from "@/app/(auth)/_layout";

interface UploadModalButtonProps {
  focused: boolean;
  color: string;
  size: number;
}

const width = Dimensions.get("screen").width / 5;
export const UploadButton = (_: UploadModalButtonProps) => {
  const router = useRouter();
  const ref = useRef<TouchableOpacity>(null);
  const [open, setOpen] = useState(false);
  const { requestPhotoAccessIfNeeded } = usePhotoLibraryPermission();
  const { setImages } = useToonImage();

  const handleSelectImage = useCallback(async () => {
    if (!(await requestPhotoAccessIfNeeded())) {
      return;
    }

    let result = await openPicker({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      orderedSelection: true,
      presentationStyle:
        ImagePicker.UIImagePickerPresentationStyle.OVER_FULL_SCREEN,
    });

    if (!result?.length) {
      return;
    }
    const compressedImages = await Promise.all(
      result.map((image) => compressIfNeeded(image))
    );

    await Promise.all(
      compressedImages.map((comImage) => ExpoImage.prefetch(comImage.path))
    );

    setOpen(false);
    setImages(compressedImages);
    router.push("/(auth)/make-toon");
  }, []);

  return (
    <>
      <TouchableOpacity
        style={{
          flex: 1,
          width,
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={ref}
        onPress={() => setOpen(true)}
      >
        {open ? <PlusActive /> : <Plus color="white" />}
      </TouchableOpacity>
      <Popover
        animationConfig={{
          delay: 0,
          duration: 150,
        }}
        onRequestClose={() => setOpen(false)}
        mode={Mode.RN_MODAL}
        isVisible={open}
        from={ref}
        offset={-10}
        popoverStyle={{
          borderRadius: 24,
          backgroundColor: "#121212",
        }}
      >
        <View
          className="bg-gray-600 border-[1px] border-gray-400 divide-y-[1px] divide-gray-400"
          style={{
            backgroundColor: "#121212",
            borderRadius: 24,
            borderStyle: "solid",
            borderColor: "#353434",
            borderWidth: 1,
            flex: 1,
          }}
        >
          <AnimatedPressable
            className="p-6 flex space-x-4 flex-row"
            onPress={handleSelectImage}
          >
            <Write />
            <Text className="text-body2-b16 text-white">툰</Text>
          </AnimatedPressable>

          <AnimatedPressable
            className="p-6 flex space-x-4 flex-row"
            onPress={() => {
              setOpen(false);
              router.push("/create");
            }}
          >
            <Challenge />
            <Text className="text-body2-b16 text-white">챌린지</Text>
          </AnimatedPressable>
        </View>
      </Popover>
    </>
  );
};
