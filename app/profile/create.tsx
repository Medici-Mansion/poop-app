import { useRef } from 'react';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';

import { gender } from '@/constants';
import { useProfileStore } from '@/stores/profile';

import { Input } from '@/components/ui/input';
import RadioGroup from '@/components/profile/create/radio-group';
import GalleryButton from '@/components/profile/create/gallery-button';
import DateTimePicker from '@/components/profile/create/date-time-picker';
import BreedSelectSheet from '@/components/profile/create/breed-select-sheet';

export default function CreateProfile() {
  const birthRef = useRef(null);
  const timePicker = useRef(null);
  const breedRef = useRef(null);

  const profileStore = useProfileStore();

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <GestureHandlerRootView>
      <SafeAreaView className="w-full h-full bg-gray-600">
        <View className="px-4 flex flex-col py-10 items-center w-full h-ful">
          <GalleryButton 
            image={profileStore.profile.avatar}
            onPress={() => router.push('select-photo')} 
          /> 

          <View className="w-full mt-6">
            <Input 
              label='반려견 이름'
              placeholder='이름' 
              onChangeText={profileStore.setName} 
              value={profileStore.profile.name}
            /> 
          </View>

          <View className="w-full mt-6">
            <Input 
              ref={birthRef} 
              label='반려견 생년월일'
              placeholder='생년월일' 
              editable={false} 
              value={profileStore.profile.birthday}
              onPress={() => timePicker.current?.show()}
              />
          </View>

          <View className="w-full mt-6 relative">
            <Input 
              ref={birthRef} 
              label='견종'
              placeholder='견종 선택' 
              editable={false} 
              value={profileStore.profile.breed?.name || ''}
              onPress={() => breedRef.current?.open()}
            />
            <View className="absolute right-4 flex items-center top-10">
              <MaterialIcons name="keyboard-arrow-down" size={24} color='white' />
            </View>
          </View>

          <View className="w-full mt-6">
            <Text className="text-gray-200 b-12 text-14 font-bold mb-4">성별</Text>
            <RadioGroup 
              options={gender} 
              selectedOption={profileStore.profile.gender}
              onSelect={profileStore.setGender}
            />
          </View>
        </View>

        <DateTimePicker dateTimeRef={timePicker} date={profileStore.profile.birthday} onConfirm={profileStore.setBirthday} />
        <BreedSelectSheet onSelect={profileStore.setBreed} breedRef={breedRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  </TouchableWithoutFeedback>
  );
}
