import { Text, View } from 'react-native';
import React from 'react';

import { SafeAreaView } from "react-native-safe-area-context";
// import ImagePicker from '@/components/profile/ImagePicker';
// import RadioGroup from "@/components/radio-group";
// import { options } from "@/constants/gender";
import DateTimePicker from '@/components/date-time-picker';

export default function CreateProfile() {
  const [date, setDate] = React.useState<string>('');

  const testConfirm = (date: string) => {
    // TODO: 재사용 input 컴포넌트 연결하면서 수정
    console.log('testConfirm', date);
    setDate(date);
  }
  
  return (
     // TODO: 주석처리된 영역은 재사용 input 컴포넌트로 변경해야함
    <SafeAreaView className="h-full flex-1 bg-black px-12">
      <View className="px-10 flex flex-col flex-1 py-20 items-center">
        {/* <ImagePicker /> */}
        {/* 반려견 이름 */}
        <DateTimePicker date={date} onConfirm={testConfirm}>
          <Text className="text-white">반려견 이름 {date}</Text>
        </DateTimePicker>
        <Text className="text-white text-2xl font-bold mt-10">반려견 생년월일</Text>
        {/* 견종 */}
        {/* <RadioGroup options={options} /> */}
      </View>
    </SafeAreaView>
  );
}
