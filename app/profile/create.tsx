import { useRef, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { gender } from '@/constants';

import { Input } from '@/components/ui/input';
import RadioGroup from '@/components/profile/create/radio-group';
import GalleryButton from '@/components/profile/gallery-button';
import DateTimePicker from '@/components/profile/create/date-time-picker';
import BreedSelectSheet from '@/components/profile/create/breed-select-sheet';

export default function CreateProfile() {
  const birthRef = useRef(null);
  const timePicker = useRef(null);
  const breedRef = useRef(null);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedGender, setSelectedGender] = useState('FEMALE');

  const handleBirthChange = (date: string) => {
    setDate(date);
  }

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <GestureHandlerRootView>
      <SafeAreaView className="w-full h-full bg-gray-600">
          <View className="px-4 flex flex-col py-10 items-center w-full h-ful">
            <GalleryButton onPress={() => router.push('select-photo')} /> 
            <View className="w-full mt-6">
              <Input label='반려견 이름' placeholder='이름' onChangeText={setName} value={name} /> 
            </View>
            <View className="w-full mt-6">
              <Input 
                ref={birthRef} 
                label='반려견 생년월일'
                placeholder='생년월일' 
                editable={false} 
                value={date} 
                onChangeText={handleBirthChange} 
                onPress={() => timePicker.current?.show()}
                />
            </View>
            <View className="w-full mt-6">
              <Input 
                ref={birthRef} 
                label='견종'
                placeholder='견종 선택' 
                editable={false} 
                value={selectedBreed?.name || ''}
                onPress={() => breedRef.current?.open()}
              />
            </View>
            <View className="w-full mt-6">
              <Text className="text-gray-200 b-12 text-14 font-bold mb-4">성별</Text>
              <RadioGroup options={gender} selectedOption={selectedGender} onSelect={setSelectedGender} />
            </View>
          </View>
        <DateTimePicker dateTimeRef={timePicker} date={date} onConfirm={handleBirthChange} />
        <BreedSelectSheet onSelect={setSelectedBreed} breedRef={breedRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  </TouchableWithoutFeedback>
  );
}
