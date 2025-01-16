import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

export default function PrayersScreen() {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { name: 'All', icon: 'apps-outline', count: 12 },
    { name: 'Personal', icon: 'person-outline', count: 5 },
    { name: 'Family', icon: 'people-outline', count: 3 },
    { name: 'Health', icon: 'fitness-outline', count: 2 },
    { name: 'Work', icon: 'briefcase-outline', count: 2 },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold">My Prayers</Text>
        <View className="mt-4 flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search prayers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-6 py-4"
        >
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={category.name}
              className={`flex-row items-center bg-white rounded-full px-4 py-2 mr-2 border border-gray-200`}
            >
              <Ionicons name={category.icon} size={18} color="#4F46E5" />
              <Text className="ml-2 font-medium">{category.name}</Text>
              <View className="bg-gray-100 rounded-full px-2 py-1 ml-2">
                <Text className="text-xs text-gray-600">{category.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Prayer List */}
        <View className="px-6 py-4">
          <View className="space-y-4">
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} className="bg-white p-4 rounded-xl shadow-sm">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="font-medium">Daily Strength</Text>
                    <Text className="text-gray-600 mt-1" numberOfLines={2}>
                      Lord, grant me the strength to face today's challenges with grace and courage...
                    </Text>
                  </View>
                  <Ionicons name="bookmark-outline" size={24} color="#6B7280" />
                </View>
                <View className="flex-row items-center mt-3">
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text className="text-gray-500 ml-1">Daily</Text>
                  <View className="flex-row items-center ml-4">
                    <Ionicons name="repeat-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-500 ml-1">5 times</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
