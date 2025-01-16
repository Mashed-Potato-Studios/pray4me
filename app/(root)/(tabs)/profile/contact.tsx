import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Contact() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    // Implement contact form submission
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Contact Us' }} />
      
      <View className="p-6">
        <View className="bg-indigo-50 rounded-xl p-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle-outline" size={24} color="#4F46E5" />
            <Text className="text-indigo-600 font-medium ml-2">Need Help?</Text>
          </View>
          <Text className="text-indigo-600">
            Our support team typically responds within 24 hours. For immediate assistance, 
            please check our Help Center.
          </Text>
        </View>

        <View className="space-y-6">
          <View>
            <Text className="text-gray-600 mb-2">Subject</Text>
            <TextInput
              value={subject}
              onChangeText={setSubject}
              className="bg-white p-4 rounded-xl"
              placeholder="What can we help you with?"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Message</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              className="bg-white p-4 rounded-xl"
              placeholder="Tell us more about your issue"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            className="bg-indigo-600 p-4 rounded-xl"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-semibold">Send Message</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <Text className="text-gray-600 mb-4">Other ways to reach us</Text>
          
          <View className="space-y-4">
            <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center">
              <Ionicons name="mail-outline" size={24} color="#4F46E5" />
              <View className="ml-3 flex-1">
                <Text className="font-medium">Email</Text>
                <Text className="text-gray-500">support@pray4me.com</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center">
              <Ionicons name="logo-twitter" size={24} color="#4F46E5" />
              <View className="ml-3 flex-1">
                <Text className="font-medium">Twitter</Text>
                <Text className="text-gray-500">@pray4me_app</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
