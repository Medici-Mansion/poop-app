import React from 'react';
import { Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderLeftButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <AntDesign name="close" size={24} color="white" />
    </Pressable>
  );
};

// TODO: 동작 연결하기
const HeaderRightButton = () => {
  return (
    <Pressable onPress={() => alert('Info button pressed!')}>
      <Text className="text-white">등록</Text>
    </Pressable>
  );
};

const Header = {
  LeftButton: HeaderLeftButton,
  RightButton: HeaderRightButton,
};

export default Header;