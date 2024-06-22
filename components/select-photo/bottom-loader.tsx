import React from 'react'

import { ActivityIndicator } from 'react-native'

export default function BottomLoader(loading: boolean) {
  return loading ? <ActivityIndicator size="large" color="#fff" /> : null
}
