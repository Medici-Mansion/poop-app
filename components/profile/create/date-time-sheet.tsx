import dayjs from 'dayjs';
import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { StyleSheet, Pressable, Text, Keyboard } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import BottomSheet, { BottomSheetView, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";


interface DateTimeSheetProps {
  isPending?: boolean;
  date?: string;
  onConfirm?: (date: string) => void;
}

interface HandleProps {
  isPending: boolean;
  handleConfirm: () => void;
}

/** 
 * renderHandle
 * bottom의 핸들이자 확인 버튼
 * */ 
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

/** 
 * renderBackdrop
 * bottom의 배경이자 bottom의 clickOutside를 위한 컴포넌트
 * */ 
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

/** 
 * CustomDateTimeSheet
 * 날짜 선택을 위한 커스텀 DateTimeSheet
 * */ 
const CustomDateTimeSheet = forwardRef((props: DateTimeSheetProps, ref) => {
  const { date = '', onConfirm, isPending = false, ...rest } = props;
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

  const show = async () => {
    await Keyboard.dismiss();
    showBottomSheet();
  }

  useImperativeHandle(ref, () => (
    { show, hide: hideBottomSheet }
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
});


const styles = StyleSheet.create({
  dateTimePicker: {
    backgroundColor: 'rgb(229 231 235)', // bg-gray-200
    height: 350,
    width: '100%',
  },
});

export default CustomDateTimeSheet;