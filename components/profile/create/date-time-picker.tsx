import dayjs from 'dayjs';
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import BottomSheet, { BottomSheetView, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";


interface DateTimePickerProps {
  isPending?: boolean;
  date?: string;
  onConfirm?: (date: string) => void;
  onPickerToggle?: (show: boolean) => void;
  dateTimeRef?: React.Ref<any>;
}

interface HandleProps {
  isPending: boolean;
  handleConfirm: () => void;
}

const renderHandle = (props: HandleProps) => {
  const { isPending, handleConfirm } = props;
  return (
    <Pressable
      disabled={isPending}
      className='h-12 bg-white w-full items-center justify-center'
      onPress={handleConfirm}>
      <Text className="bg-white text-black text-center py-3 font-bold">확인</Text>
    </Pressable>
  );
}

const renderBackdrop = ((props: any) => {
  const { onPress, ...rest } = props;
    return (
      <BottomSheetBackdrop 
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0}
      onPress={onPress}
      {...rest} 
      />
    )
  });

export default function CustomDateTimePicker(props: DateTimePickerProps) {
  const { date = '', dateTimeRef, onConfirm, onPickerToggle, isPending = false, ...rest } = props;
  const [value, setValue] = useState<string>(date || dayjs().format('YYYY-MM-DD'));
  const { hideBottomSheet, ref: bottomSheetRef, showBottomSheet, snapPoints } = useBottomSheet("50%");

  React.useEffect(() => {
    setValue(date || dayjs().format('YYYY-MM-DD'));
  }, [date]);

  const handleConfirm = () => {
    onConfirm?.(value);
    hideBottomSheet();
  };

  const handleDateChange = (event: any, newDate?: Date) => {
    if (event.type === 'dismissed') {
      hideBottomSheet();
      return;
    }
    if (newDate) updateValue(newDate);
  };

  const updateValue = (newDate: Date) => {
    setValue(dayjs(newDate).format('YYYY-MM-DD'));
  };

  useImperativeHandle(dateTimeRef, () => (
    { show: showBottomSheet, hide: hideBottomSheet }
  ));

  return (
    <BottomSheetModalProvider>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleComponent={() => renderHandle({ isPending, handleConfirm })}
        backdropComponent={(props) => renderBackdrop({ ...props, onPress: hideBottomSheet })}
      >
        <BottomSheetView>
          <RNDateTimePicker
            style={styles.dateTimePicker}
            value={value ? new Date(value) : new Date()}
            locale="ko"
            mode="date"
            display="spinner"
            themeVariant="light"
            onChange={handleDateChange}
            {...rest}
          />
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  dateTimePicker: {
    backgroundColor: 'rgb(229 231 235)', // bg-gray-200
    height: 350,
    width: '100%',
},
});