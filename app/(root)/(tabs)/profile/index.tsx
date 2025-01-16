import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useGlobalContext } from '@/providers/global-provider'
import { logout } from '@/lib/appwrite'
import { useState } from 'react'
import { router } from 'expo-router'

export default function ProfileScreen() {
  const { user, refetch } = useGlobalContext()
  const [notifications, setNotifications] = useState(true)

  const handleLogout = async () => {
    try {
      await logout()
      await refetch()
      router.replace('/(auth)/sign-in')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const menuItems = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Personal Information', href: '/profile/personal-info' },
        { icon: 'notifications-outline', label: 'Notifications', 
          right: <Switch value={notifications} onValueChange={setNotifications} /> },
        { icon: 'lock-closed-outline', label: 'Privacy', href: '/profile/privacy' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'color-palette-outline', label: 'Appearance', href: '/profile/appearance' },
        { icon: 'language-outline', label: 'Language', href: '/profile/language' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help Center', href: '/profile/help' },
        { icon: 'mail-outline', label: 'Contact Us', href: '/profile/contact' },
        { icon: 'information-circle-outline', label: 'About', href: '/profile/about' },
      ]
    }
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="px-6 py-6 bg-white border-b border-gray-200">
          <View className="items-center">
            <View className="w-20 h-20 bg-indigo-100 rounded-full items-center justify-center mb-3">
              <Text className="text-2xl text-indigo-600 font-semibold">
                {user?.name?.[0]?.toUpperCase() || '?'}
              </Text>
            </View>
            <Text className="text-xl font-bold">{user?.name || 'User'}</Text>
            <Text className="text-gray-600 mt-1">{user?.email}</Text>
          </View>

          <View className="flex-row justify-around mt-6">
            <View className="items-center">
              <Text className="text-2xl font-bold">124</Text>
              <Text className="text-gray-600">Prayers</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold">56</Text>
              <Text className="text-gray-600">Groups</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold">892</Text>
              <Text className="text-gray-600">Prayed</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View className="px-6 py-4">
          {menuItems.map((section) => (
            <View key={section.title} className="mb-6">
              <Text className="text-gray-600 text-sm mb-2">{section.title}</Text>
              <View className="bg-white rounded-xl overflow-hidden">
                {section.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.label}
                    className={'flex-row items-center px-4 py-4 ' +
                      (index !== section.items.length - 1 ? 'border-b border-gray-100' : '')}
                    onPress={() => item.href && router.push(item.href)}
                  >
                    <Ionicons name={item.icon} size={22} color="#4F46E5" />
                    <Text className="flex-1 ml-3 font-medium">{item.label}</Text>
                    {item.right || (
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <View className="px-6 py-4">
          <TouchableOpacity
            className="bg-red-50 rounded-xl py-4 items-center"
            onPress={handleLogout}
          >
            <Text className="text-red-600 font-medium">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}