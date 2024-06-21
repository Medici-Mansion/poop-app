import { StyleSheet, Pressable, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function Header() {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={25} color="black" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
});