import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function CommunityScreen() {
  const prayerGroups = [
    { name: 'Morning Prayer Warriors', members: 156, active: 12 },
    { name: 'Faith & Family', members: 89, active: 8 },
    { name: 'Health & Healing', members: 234, active: 15 },
    { name: 'Youth Ministry', members: 167, active: 10 },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold">Community</Text>
        <Text className="text-gray-600 mt-1">Connect and pray together</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Featured Groups */}
        <View className="px-6 py-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Featured Groups</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600">See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
          >
            {prayerGroups.map((group) => (
              <TouchableOpacity 
                key={group.name}
                className="bg-white rounded-xl p-4 shadow-sm w-64"
              >
                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                    <Ionicons name="people" size={20} color="#4F46E5" />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="font-medium" numberOfLines={1}>{group.name}</Text>
                    <Text className="text-gray-500 text-sm">{group.members} members</Text>
                  </View>
                </View>
                <View className="flex-row items-center">
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-green-500 rounded-full" />
                    <Text className="text-gray-600 text-sm ml-1">{group.active} praying now</Text>
                  </View>
                  <TouchableOpacity className="ml-auto bg-indigo-600 px-3 py-1 rounded-full">
                    <Text className="text-white text-sm">Join</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold mb-4">Recent Activity</Text>
          <View className="space-y-4">
            {[1, 2, 3].map((item) => (
              <View key={item} className="bg-white p-4 rounded-xl shadow-sm">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-gray-200 rounded-full" />
                  <View className="ml-3 flex-1">
                    <Text className="font-medium">Sarah Johnson</Text>
                    <Text className="text-gray-600">Joined Morning Prayer Warriors</Text>
                  </View>
                  <Text className="text-gray-500 text-sm">2h ago</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Prayer Requests */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold mb-4">Prayer Requests</Text>
          <View className="space-y-4">
            {[1, 2].map((item) => (
              <View key={item} className="bg-white p-4 rounded-xl shadow-sm">
                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-gray-200 rounded-full" />
                  <View className="ml-3 flex-1">
                    <Text className="font-medium">Michael Smith</Text>
                    <Text className="text-gray-600 mt-1">Please pray for my upcoming surgery next week...</Text>
                    <View className="flex-row items-center mt-2">
                      <TouchableOpacity className="flex-row items-center">
                        <Ionicons name="heart-outline" size={16} color="#6B7280" />
                        <Text className="text-gray-500 ml-1">12 praying</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center ml-4">
                        <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                        <Text className="text-gray-500 ml-1">8 comments</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
