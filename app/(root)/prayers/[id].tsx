import { View, Text } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router'

const PrayerDetails = () => {
  const {id} = useSearchParams()

  return (
    <View>
      <Text>PrayerDetails {id}</Text>
    </View>
  )
}

export default PrayerDetails