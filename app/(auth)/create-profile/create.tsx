import { useRef, useEffect, useCallback } from "react";
import { router, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import { getFormData } from "@/lib/utils";
import { gender } from "@/constants";
import Event from "@/constants/RouteEvent";
import { useProfileStore } from "@/store/profile";
import useCreateProfile from "@/hooks/use-create-profile";
import usePhotoPicker from "@/hooks/use-photo-picker";

import {
  Input,
  NameInput,
  RadioGroup,
  GalleryButton,
  DateTimeSheet,
  BreedSelectSheet,
} from "@/components/my-profile/create";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateProfile() {
  const route = useRouter();
  const profileStore = useProfileStore();
  const { pickImage } = usePhotoPicker({ onPick: handlePickImage });

  const nameInputRef = useRef<{ checkError: () => void }>(null);
  const timePicker = useRef(null);
  const breedRef = useRef(null);

  const createProfile = useCallback(() => {
    const isValid = nameInputRef.current?.checkError();
    if (createPending || !isValid) return;

    const { avatar, name, birthday, gender, breed } = profileStore.profile;
    const avatarData = {
      name: avatar?.filename,
      type: "image/jpeg",
      uri: avatar?.uri,
    };
    const formData = getFormData({
      name,
      birthday,
      gender,
      breedId: breed?.id,
      avatar: avatarData,
    });
    createProfileMutate(formData);
  }, []);

  function handlePickImage(image) {
    profileStore.setAvatar({
      uri: image.uri,
      filename: image.fileName,
    });
  }

  const onSuccess = () => {
    router.push("my-profile/user");
  };
  const { mutate: createProfileMutate, isPending: createPending } =
    useCreateProfile({ onSuccess });

  useEffect(() => {
    const event = route.params?.event;
    if (!event) return;

    if (event !== Event["PROFILE:CREATE"]) return;
    createProfile();
  }, [route.params?.event]);

  useEffect(() => {
    // TODO: 테스트를 위한 하드코딩
    profileStore.setBreed({
      id: "04285b44-efe3-4238-ad8a-572b98977d5e",
      nameEN: "Coc",
      nameKR: "코카스파니엘",
      avatar: "",
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-600">
      <GestureHandlerRootView>
        <ScrollView className="w-full h-full flex-1 bg-gray-600">
          <View className="px-4 flex flex-col py-10 items-center w-full h-ful">
            <GalleryButton
              image={profileStore.profile.avatar?.uri}
              onPress={pickImage}
            />

            <View className="w-full mt-16">
              <NameInput ref={nameInputRef} />
            </View>

            <View className="w-full mt-8">
              <Input
                label="반려견 생년월일"
                placeholder="생년월일"
                editable={false}
                value={profileStore.profile.birthday}
                onPress={() => timePicker.current?.show()}
              />
            </View>

            <View className="w-full mt-8 relative">
              <Input
                label="견종"
                placeholder="견종 선택"
                editable={false}
                containerClassName="bg-gray-600 border-gray-400 border-2"
                value={profileStore.profile.breed?.name || ""}
                onPress={() => breedRef.current?.open()}
                suffix={
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color="white"
                  />
                }
              />
            </View>

            <View className="w-full mt-8">
              <Text className="text-gray-200 b-12 text-14 font-bold mb-4">
                성별
              </Text>
              <RadioGroup
                options={gender}
                selectedOption={profileStore.profile.gender}
                onSelect={profileStore.setGender}
              />
            </View>
          </View>
        </ScrollView>
        <DateTimeSheet
          ref={timePicker}
          date={profileStore.profile.birthday}
          onConfirm={profileStore.setBirthday}
        />
        <BreedSelectSheet
          value={profileStore.profile.breed?.id}
          onSelect={profileStore.setBreed}
          breedRef={breedRef}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
