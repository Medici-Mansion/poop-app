import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Portal } from 'react-native-portalize';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import dayjs from 'dayjs';

interface DateTimePickerProps {
  isPending?: boolean;
  date?: string;
  onConfirm?: (date: string) => void;
  children: React.ReactElement;
}

export default function CustomDateTimePicker(props: DateTimePickerProps) {
  const { children, date = '', onConfirm, isPending = false, ...rest } = props;

  const [value, setValue] = useState<string>(date);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showDatepicker = () => {
    setShowDatePicker(true);
    if (date) updateValue(new Date(date));
  };

  const handleConfirm = () => {
    if (value) onConfirm?.(value);
    setShowDatePicker(false);
    alert(value);
  }
  const handleDateChange = (newDate?: Date) => {
    if (!newDate) return;

    updateValue(newDate);
  }

  const updateValue = (newDate: Date) => {
    setValue(dayjs(newDate).format('YYYY-MM-DD'))
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Pressable>
        {children && React.cloneElement(children, { onPress: showDatepicker })}
      </Pressable>
      <Portal>
        {showDatePicker && (
          <View className="absolute bottom-0 w-screen">
            <Pressable
              disabled={isPending}
              onPress={handleConfirm}>
              <Text className="bg-white text-black text-center py-3">확인</Text>
            </Pressable>
            <RNDateTimePicker
              style={styles.dateTimePicker}
              value={value ? new Date(value) : new Date()}
              locale="ko"
              mode="date"
              display='spinner'
              onChange={(_, newDate) => handleDateChange(newDate)}
              {...rest}
            />
          </View>
        )}
    </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
    dateTimePicker: {
      backgroundColor: 'rgb(229 231 235)', // bg-gray-200
      width: '100%',
  },
});
