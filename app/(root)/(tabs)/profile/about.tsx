import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function About() {
  const version = '1.0.0'

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'About' }} />
      
      <View className="p-6">
        <View className="items-center mb-8">
          <Image
            source={require('@/assets/images/icon.png')}
            className="w-24 h-24 rounded-xl mb-4"
          />
          <Text className="text-2xl font-bold mb-1">Pray 4 Me</Text>
          <Text className="text-gray-500">Version {version}</Text>
        </View>

        <View className="bg-white rounded-xl overflow-hidden mb-6">
          <TouchableOpacity className="p-4 flex-row items-center border-b border-gray-100">
            <Ionicons name="star-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 flex-1">Rate the App</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="p-4 flex-row items-center border-b border-gray-100">
            <Ionicons name="share-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 flex-1">Share with Friends</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="p-4 flex-row items-center">
            <Ionicons name="newspaper-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 flex-1">Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View className="bg-indigo-50 rounded-xl p-4">
          <Text className="text-lg font-semibold mb-2">Our Mission</Text>
          <Text className="text-gray-600 leading-5">
            Pray 4 Me is dedicated to creating a global community of prayer warriors, 
            connecting people through the power of prayer. We believe in the strength 
            of unified prayer and supporting one another through life's journey.
          </Text>
        </View>

        <View className="mt-8">
          <Text className="text-center text-gray-500">
            Made with ❤️ by Mashed Potato Studios
          </Text>
          <Text className="text-center text-gray-400 mt-1">
            Copyright © {new Date().getFullYear()} All rights reserved
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}
