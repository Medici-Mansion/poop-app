import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';
import React from 'react';

import { SafeAreaView } from "react-native-safe-area-context";
// import ImagePicker from '@/components/profile/image-picker';
import DateTimePicker from '@/components/date-time-picker';
import Input from '@/components/profile/input';
import Filter from '@/components/profile/filter';
import RadioGroup from '@/components/profile/radio-group';
import GalleryButton from '@/components/profile/gallery-button';

// TODO: 분리
const gender = [
  { label: '수컷', value: 'MALE' },
  { label: '암컷', value: 'FEMALE' },
  { label: '선택안함', value: 'NONE' },
];

export default function CreateProfile() {
  const birthRef = React.useRef(null);
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('FEMALE');

  const handleBirthChange = (date: string) => {
    setDate(date);
  }

  const handlePickerToggle = (show: boolean) => {
    // TODO: 이 부분 input에 focus를 줄 수 있도록 수정
    Keyboard.dismiss();
    if (!show)  birthRef.current?.focusOut();
    else birthRef.current?.focusIn();
    
  }
  
  // Keyboard.dismiss
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView className="w-full h-full bg-gray-600">
        <View className="px-4 flex flex-col py-10 items-center w-full h-full">
            <GalleryButton />
            {/* <ImagePicker /> */}
            {/* TODO: 반려견 이름 글자수 제한 */}
            <Input label='반려견 이름' placeholder='이름' onChangeText={setName} value={name} /> 
            {/* TODO: DateTimePicker 클릭 후 반려견 이름 focus시 DatePicker가 유지되는 이슈 */}
            <DateTimePicker date={date} onConfirm={handleBirthChange} onPickerToggle={handlePickerToggle}>
              <Input ref={birthRef} label='반려견 생년월일' placeholder='생년월일' editable={false} value={date} onChangeText={handleBirthChange} />
            </DateTimePicker>
            <Filter label='견종' placeholder='견종 선택' />
            
            <View className="w-full mt-6">
              <Text className="text-gray-200 b-12 text-14 font-bold mb-4">성별</Text>
              <RadioGroup options={gender} selectedOption={selectedGender} onSelect={setSelectedGender} />
            </View>
        </View>
    </SafeAreaView>
  </TouchableWithoutFeedback>
  );
}
