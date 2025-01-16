import { View, Text, Switch, ScrollView } from 'react-native'
import { useState } from 'react'
import { Stack } from 'expo-router'

export default function Privacy() {
  const [isPublicProfile, setIsPublicProfile] = useState(true)
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)
  const [allowMessages, setAllowMessages] = useState(true)

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Privacy Settings' }} />
      
      <View className="p-6">
        <View className="bg-white rounded-xl overflow-hidden">
          <View className="p-4 border-b border-gray-100">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium mb-1">Public Profile</Text>
                <Text className="text-gray-500 text-sm">Allow others to see your profile</Text>
              </View>
              <Switch value={isPublicProfile} onValueChange={setIsPublicProfile} />
            </View>
          </View>

          <View className="p-4 border-b border-gray-100">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium mb-1">Online Status</Text>
                <Text className="text-gray-500 text-sm">Show when you're online</Text>
              </View>
              <Switch value={showOnlineStatus} onValueChange={setShowOnlineStatus} />
            </View>
          </View>

          <View className="p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-medium mb-1">Direct Messages</Text>
                <Text className="text-gray-500 text-sm">Allow others to send you messages</Text>
              </View>
              <Switch value={allowMessages} onValueChange={setAllowMessages} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
