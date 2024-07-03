import { useRef } from 'react';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { View } from 'react-native';

import { useProfileStore } from '@/store/profile';

import { Input } from '@/components/profile/create/input';
import GalleryButton from '@/components/profile/create/gallery-button';
import DateTimeSheet from '@/components/profile/create/date-time-sheet';
import BreedSelectSheet from '@/components/profile/create/breed-select-sheet';

export default function CreateProfile() {
  const timePicker = useRef(null);
  const breedRef = useRef(null);
  const profileStore = useProfileStore();

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="w-full h-full bg-gray-600">
        {/* TODO: 스크롤 상단에 padding이 있는 현상 수정하기 */}
        <ScrollView className="w-full h-full flex-1">
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
                label='반려견 생년월일'
                placeholder='생년월일' 
                editable={false} 
                value={profileStore.profile.birthday}
                onPress={() => timePicker.current?.show()}
                />
            </View>

            <View className="w-full mt-6 relative">
              <Input 
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
          </View>

        </ScrollView>
        <DateTimeSheet ref={timePicker} date={profileStore.profile.birthday} onConfirm={profileStore.setBirthday} />
        <BreedSelectSheet value={profileStore.profile.breed?.id} onSelect={profileStore.setBreed} breedRef={breedRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
