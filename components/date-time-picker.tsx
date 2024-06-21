import React, { useImperativeHandle, useState, useCallback } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useBottomSheet } from "@/hooks/use-bottom-sheet";

import dayjs from 'dayjs';

interface DateTimePickerProps {
  isPending?: boolean;
  date?: string;
  onConfirm?: (date: string) => void;
  onPickerToggle?: (show: boolean) => void;
  dateTimeRef?: React.Ref<any>;
}

const renderHandle = ({ isPending, handleConfirm }: { isPending: boolean, handleConfirm: () => void }) => {
  return (
    <Pressable
      disabled={isPending}
      onPress={handleConfirm}>
      <Text className="bg-white text-black text-center py-3 font-bold">확인</Text>
    </Pressable>
  );
}


export default function CustomDateTimePicker(props: DateTimePickerProps) {
  const { date = '', dateTimeRef, onConfirm, onPickerToggle, isPending = false, ...rest } = props;

  const [value, setValue] = useState<string>(date || dayjs().format('YYYY-MM-DD'));

  const { hideBottomSheet, ref: bottomSheetRef, showBottomSheet, snapPoints } = useBottomSheet("43%");

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
    {
      show: showBottomSheet,
      hide: hideBottomSheet,
    }
  ));

  const renderBackdrop = useCallback(
  (props: any) =>
  <BottomSheetBackdrop 
    {...props} 
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0}
    onPress={hideBottomSheet}
  />,
  []
);

  return (
    <BottomSheetModalProvider>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleComponent={() => renderHandle({ isPending, handleConfirm })}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <RNDateTimePicker
            style={styles.dateTimePicker}
            value={value ? new Date(value) : new Date()}
            locale="ko"
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            {...rest}
          />
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
    dateTimePicker: {
      backgroundColor: 'rgb(229 231 235)', // bg-gray-200
      width: '100%',
  },
});