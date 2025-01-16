import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for prayer requests (to be replaced with real data)
  const recentPrayers = [
    {
      id: 1,
      user: { name: "Sarah M.", avatar: null },
      title: "Healing for my mother",
      description: "Please pray for my mother's recovery from surgery",
      prayerCount: 24,
      timeAgo: "2h",
    },
    {
      id: 2,
      user: { name: "John D.", avatar: null },
      title: "Guidance in career",
      description: "Seeking wisdom for an important career decision",
      prayerCount: 18,
      timeAgo: "4h",
    },
  ];

  const prayerCategories = [
    { id: 1, name: "Health", icon: "fitness", color: "#EF4444" },
    { id: 2, name: "Family", icon: "people", color: "#3B82F6" },
    { id: 3, name: "Work", icon: "briefcase", color: "#10B981" },
    { id: 4, name: "Guidance", icon: "compass", color: "#8B5CF6" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <Header />
      
      <ScrollView className="flex-1">
        <View className="px-4 py-3">
          <Search
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search prayer requests..."
          />
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-around px-4 py-4">
          <TouchableOpacity 
            className="items-center"
            onPress={() => router.push("/new-prayer")}
          >
            <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mb-1">
              <Ionicons name="add" size={24} color="#4F46E5" />
            </View>
            <Text className="text-xs text-gray-600">New Prayer</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="items-center"
            onPress={() => router.push("/groups")}
          >
            <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mb-1">
              <Ionicons name="people" size={24} color="#4F46E5" />
            </View>
            <Text className="text-xs text-gray-600">Groups</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="items-center"
            onPress={() => router.push("/my-prayers")}
          >
            <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mb-1">
              <Ionicons name="heart" size={24} color="#4F46E5" />
            </View>
            <Text className="text-xs text-gray-600">My Prayers</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="items-center"
            onPress={() => router.push("/bible")}
          >
            <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mb-1">
              <Ionicons name="book" size={24} color="#4F46E5" />
            </View>
            <Text className="text-xs text-gray-600">Bible</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold mb-3">Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="space-x-3"
          >
            {prayerCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="bg-white rounded-xl p-3 flex-row items-center"
                style={{ minWidth: 120 }}
              >
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Ionicons 
                    name={category.icon} 
                    size={18} 
                    color={category.color} 
                  />
                </View>
                <Text className="font-medium">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Prayer Requests */}
        <View className="px-4 py-2">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold">Recent Prayers</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600">See All</Text>
            </TouchableOpacity>
          </View>

          {recentPrayers.map((prayer) => (
            <TouchableOpacity
              key={prayer.id}
              className="bg-white rounded-xl p-4 mb-3"
            >
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center">
                  <Text className="text-sm text-indigo-600 font-semibold">
                    {prayer.user.name[0]}
                  </Text>
                </View>
                <View className="ml-2">
                  <Text className="font-medium">{prayer.user.name}</Text>
                  <Text className="text-xs text-gray-500">{prayer.timeAgo} ago</Text>
                </View>
              </View>

              <Text className="font-semibold mb-1">{prayer.title}</Text>
              <Text className="text-gray-600 text-sm mb-2">
                {prayer.description}
              </Text>

              <View className="flex-row items-center">
                <TouchableOpacity 
                  className="flex-row items-center bg-indigo-50 rounded-full px-3 py-1"
                >
                  <Ionicons name="heart-outline" size={16} color="#4F46E5" />
                  <Text className="text-indigo-600 text-sm ml-1">
                    Pray ({prayer.prayerCount})
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
