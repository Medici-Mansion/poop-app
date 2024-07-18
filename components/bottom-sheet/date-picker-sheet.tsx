import React, { memo, useImperativeHandle, useState } from "react";
import { Keyboard, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import dayjs from "dayjs";
import { Button } from "../ui";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

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
export const DatePickerSheet = memo(
  ({
    setValue,
    sheetRef,
  }: {
    sheetRef?: React.Ref<any>;
    setValue: (date: string) => void;
  }) => {
    const { ref, snapPoints, hideBottomSheet } = useBottomSheet("50%");
    const [date, setDate] = useState(new Date());

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        const currentDate = selectedDate;
        setDate(currentDate);
      }
    };

    const handleAnimate = (from: number, to: number) => {
      if (to === -1) {
        ref.current?.close();
      }
    };

    const setBirthDay = () => {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setValue(formattedDate);
      ref.current?.close();
    };

    useImperativeHandle(sheetRef, () => ({
      close: (ref.current as BottomSheetModalMethods)?.close,
      show: () => {
        Keyboard.dismiss();
        (ref.current as BottomSheetModalMethods)?.present();
      },
    }));

    return (
      <>
        <BottomSheetModal
          ref={ref as any}
          index={0}
          snapPoints={snapPoints}
          onAnimate={handleAnimate}
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
                <Button
                  label="확인"
                  className="flex items-center bg-white py-4 w-full px-4 rounded-xl mb-14"
                  onPress={setBirthDay}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </>
    );
  }
);
