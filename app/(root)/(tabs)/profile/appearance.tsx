import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Appearance() {
  const [theme, setTheme] = useState('system') // 'light', 'dark', 'system'
  const [fontSize, setFontSize] = useState('medium') // 'small', 'medium', 'large'

  const themes = [
    { id: 'light', label: 'Light', icon: 'sunny-outline' },
    { id: 'dark', label: 'Dark', icon: 'moon-outline' },
    { id: 'system', label: 'System', icon: 'settings-outline' },
  ]

  const fontSizes = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
  ]

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Appearance' }} />
      
      <View className="p-6">
        <Text className="text-gray-600 mb-2">Theme</Text>
        <View className="bg-white rounded-xl overflow-hidden mb-6">
          {themes.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={'p-4 flex-row items-center justify-between ' + 
                (item.id !== themes[themes.length - 1].id ? 'border-b border-gray-100' : '')}
              onPress={() => setTheme(item.id)}
            >
              <View className="flex-row items-center">
                <Ionicons name={item.icon} size={20} color="#4F46E5" />
                <Text className="ml-3">{item.label}</Text>
              </View>
              {theme === item.id && (
                <Ionicons name="checkmark" size={20} color="#4F46E5" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-gray-600 mb-2">Font Size</Text>
        <View className="bg-white rounded-xl overflow-hidden">
          {fontSizes.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={'p-4 flex-row items-center justify-between ' + 
                (item.id !== fontSizes[fontSizes.length - 1].id ? 'border-b border-gray-100' : '')}
              onPress={() => setFontSize(item.id)}
            >
              <Text>{item.label}</Text>
              {fontSize === item.id && (
                <Ionicons name="checkmark" size={20} color="#4F46E5" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
