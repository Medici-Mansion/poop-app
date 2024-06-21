import { Pressable, Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { theme } from '@/theme';
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';

import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

interface FormField {
  errors?: string[];
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  label?: string;
  placeholder: string;
  editable?: boolean;
}

const Input = forwardRef(({
  errors = [],
  value = '',
  label = '',
  onChangeText = () => {},
  ...rest
}: FormField, ref) => {
  const [text, setText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChangeText = (text: string) => {
    setText(text);
    onChangeText(text);
  };

  // TODO: focusIn, focusOut 함수를 이용하여 input에 focus를 줄 수 있도록 구현
  useImperativeHandle(ref, () => ({
    focusIn: () => {
      inputRef.current?.focus();
      setIsFocused(true);
    },
    focusOut: () => {
      inputRef.current?.blur();
      setIsFocused(false);
    }
  }));

  return (
    <View className="w-full py-1.5 space-y-2">
      {label && <Text className="text-gray-200 b-12 text-14 font-bold mb-2">{label}</Text>}
      <View className="w-full h-16 bg-gray-500 flex flex-row items-center relative rounded-2xl">
          <TextInput
            value={text}
            ref={inputRef}
            onChangeText={handleChangeText}
            className="text-white w-full h-16 px-4 rounded-2xl border-2"
            style={ isFocused ? styles.inputFocused : styles.input }
            placeholderTextColor={theme.colors.gray[300]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
        {
          text.length > 0 &&
          <Pressable onPress={() => handleChangeText('')} className="absolute right-4 flex items-center">
              <AntDesign name="minuscircle" size={20} color={theme.colors.gray[300]} />
            </Pressable>
        }
      </View>
      {errors &&
        errors.map((error, idx) => (
          <Animated.Text
            entering={FadeIn.duration(100).springify().mass(0.3)}
            exiting={FadeOut.duration(100).springify().mass(0.3)}
            layout={CurvedTransition.duration(100).delay(120)}
            key={idx}
            className="text-system-red"
          >
            {error}
          </Animated.Text>
        ))}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.gray[500],
  },
  inputFocused: {
    borderColor: theme.colors.gray[300],
  },
});

export default Input;
