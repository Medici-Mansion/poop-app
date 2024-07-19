import { useRef, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import { getFormData } from '@/utils';
import { gender } from '@/constants';
import Event from '@/constants/RouteEvent';
import { useProfileStore } from '@/store/profile';
import useCreateProfile from '@/hooks/use-create-profile';

import { Input } from '@/components/profile/create/input';
import NameInput from '@/components/profile/create/name-input';
import RadioGroup from '@/components/profile/create/radio-group';
import GalleryButton from '@/components/profile/create/gallery-button';
import DateTimeSheet from '@/components/profile/create/date-time-sheet';
import BreedSelectSheet from '@/components/profile/create/breed-select-sheet';

export default function CreateProfile() {
  const route = useRoute();
  const profileStore = useProfileStore();

  const nameInputRef = useRef<{ checkError: () => void }>(null);
  const timePicker = useRef(null);
  const breedRef = useRef(null);

  const onSuccess = () => {
    router.push('profile');
  }
  const { mutate: createProfileMutate, isPending: createPending } = useCreateProfile({ onSuccess });

  useEffect(() => {
    const event = route.params?.event;
    if (!event) return;

    if (event !== Event['PROFILE:CREATE']) return;
    createProfile();
  }, [route.params?.event]);

  const createProfile = useCallback(() => {
    const isValid = nameInputRef.current?.checkError();
    if (createPending || !isValid) return;

    const { avatar, name, birthday, gender, breed } = profileStore.profile;
    const avatarData = { name: avatar?.filename, type: 'image/jpeg', uri: avatar?.uri };
    const formData = getFormData({
      name,
      birthday,
      gender,
      breedId: breed?.id,
      avatar: avatarData,
    });
    createProfileMutate(formData);
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView className="w-full h-full flex-1 bg-gray-600">
        <View className="px-4 flex flex-col py-10 items-center w-full h-ful">
          <GalleryButton
            image={profileStore.profile.avatar?.uri}
            onPress={() => router.push('select-photo')}
          />

          <View className="w-full mt-16">
            <NameInput ref={nameInputRef} />
          </View>

          <View className="w-full mt-8">
            <Input
              label='반려견 생년월일'
              placeholder='생년월일'
              editable={false}
              value={profileStore.profile.birthday}
              onPress={() => timePicker.current?.show()}
              />
          </View>

          <View className="w-full mt-8 relative">
            <Input
              label='견종'
              placeholder='견종 선택'
              editable={false}
              className='bg-gray-600 border-gray-400 border-2'
              value={profileStore.profile.breed?.name || ''}
              onPress={() => breedRef.current?.open()}
            />
            <View className="absolute right-6 flex items-center top-14">
              <MaterialIcons name="keyboard-arrow-down" size={24} color='white' />
            </View>
          </View>

          <View className="w-full mt-8">
            <Text className="text-gray-200 b-12 text-14 font-bold mb-4">성별</Text>
            <RadioGroup
              options={gender}
              selectedOption={profileStore.profile.gender}
              onSelect={profileStore.setGender}
            />
          </View>
        </View>
      </ScrollView>
      <DateTimeSheet ref={timePicker} date={profileStore.profile.birthday} onConfirm={profileStore.setBirthday} />
      <BreedSelectSheet value={profileStore.profile.breed?.id} onSelect={profileStore.setBreed} breedRef={breedRef} />
    </GestureHandlerRootView>
  );
}