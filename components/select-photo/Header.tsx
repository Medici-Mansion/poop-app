import { StyleSheet, Pressable, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


const Header = () => {
  return (
    <View className='flex-row items-center justify-between p-3'>
      <Pressable onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={25} color="white" />
      </Pressable>
    </View>
  )
}

export default Header;