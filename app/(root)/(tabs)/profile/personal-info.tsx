import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useGlobalContext } from '@/providers/global-provider'
import { useState } from 'react'
import { Stack } from 'expo-router'

export default function PersonalInfo() {
  const { user } = useGlobalContext()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')

  const handleSave = () => {
    // Implement save functionality
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Personal Information' }} />
      
      <View className="p-6">
        <View className="space-y-6">
          <View>
            <Text className="text-gray-600 mb-2">Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="bg-white p-4 rounded-xl"
              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="bg-white p-4 rounded-xl"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              className="bg-white p-4 rounded-xl"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            className="bg-indigo-600 p-4 rounded-xl mt-4"
            onPress={handleSave}
          >
            <Text className="text-white text-center font-semibold">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
