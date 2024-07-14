import React, { SetStateAction, useState } from "react";
import { Pressable, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import dayjs from "dayjs";
import { UseFormSetValue } from "react-hook-form";

interface FormValues {
  id: string;
  nickname: string;
  password: string;
  birthday: string;
  gender: string;
  phone: string;
  email: string;
  code: string;
}

const DatePickerSheet = ({
  setPicker,
  setValue,
  setStep,
}: {
  setPicker: React.Dispatch<SetStateAction<boolean>>;
  setValue: (date: string) => void;
  setStep: React.Dispatch<SetStateAction<number>>;
}) => {
  const { ref, snapPoints, hideBottomSheet } = useBottomSheet("50%");
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
    }
  };

  const setBirthDay = () => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setValue(formattedDate);
    hideBottomSheet();
    setPicker(false);
    setStep((prev) => prev + 1);
  };

  return (
    <>
      <BottomSheet
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#121212" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <BottomSheetView>
          <View className="px-4 space-y-2 flex flex-col justify-evenly h-full">
            <View className="flex justify-evenly h-full px-4">
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                onChange={onChange}
                display="spinner"
                textColor="white"
                style={{
                  position: "relative",
                  height: "70%",
                  backgroundColor: "#121212",
                  paddingVertical: 10,
                }}
              />
              <Pressable
                className="flex items-center bg-white py-4 w-full px-4 rounded-xl mb-14"
                onPress={setBirthDay}
              >
                <Text className="text-black">확인</Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default DatePickerSheet;
