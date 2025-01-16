import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const languages = [
    { id: 'en', label: 'English', native: 'English' },
    { id: 'es', label: 'Spanish', native: 'Español' },
    { id: 'fr', label: 'French', native: 'Français' },
    { id: 'de', label: 'German', native: 'Deutsch' },
    { id: 'it', label: 'Italian', native: 'Italiano' },
    { id: 'pt', label: 'Portuguese', native: 'Português' },
    { id: 'ru', label: 'Russian', native: 'Русский' },
    { id: 'zh', label: 'Chinese', native: '中文' },
    { id: 'ja', label: 'Japanese', native: '日本語' },
    { id: 'ko', label: 'Korean', native: '한국어' },
  ]

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Language' }} />
      
      <View className="p-6">
        <View className="bg-white rounded-xl overflow-hidden">
          {languages.map((language, index) => (
            <TouchableOpacity
              key={language.id}
              className={'p-4 flex-row items-center justify-between ' + 
                (index !== languages.length - 1 ? 'border-b border-gray-100' : '')}
              onPress={() => setSelectedLanguage(language.id)}
            >
              <View>
                <Text className="font-medium">{language.label}</Text>
                <Text className="text-gray-500 text-sm">{language.native}</Text>
              </View>
              {selectedLanguage === language.id && (
                <Ionicons name="checkmark" size={20} color="#4F46E5" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
