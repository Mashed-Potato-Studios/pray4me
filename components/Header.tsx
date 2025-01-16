import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ViewStyle,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '@/providers/global-provider';
import { router } from 'expo-router';
import { Models } from 'appwrite';

interface HeaderProps {
  containerStyle?: ViewStyle;
  showNotifications?: boolean;
  showMessages?: boolean;
}

export default function Header({
  containerStyle,
  showNotifications = true,
  showMessages = true,
}: HeaderProps) {
  const { user } = useGlobalContext();
  const [unreadNotifications, setUnreadNotifications] = React.useState(3);
  const [unreadMessages, setUnreadMessages] = React.useState(2);

  // This will be expanded later to get dynamic welcome messages based on prayers
  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleAvatarPress = () => {
    router.push('/(tabs)/profile');
  };

  const handleNotificationsPress = () => {
    // Navigate to notifications page (to be implemented)
    router.push('/notifications');
  };

  const handleMessagesPress = () => {
    // Navigate to messages page (to be implemented)
    router.push('/messages');
  };

  return (
    <View 
      className={'px-4 py-3 bg-white border-b border-gray-200 ' + 
        (Platform.OS === 'ios' ? 'pt-14' : 'pt-3')}
      style={containerStyle}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleAvatarPress}>
            {user?.prefs?.avatarUrl ? (
              <Image
                source={{ uri: user.prefs.avatarUrl }}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
                <Text className="text-lg text-indigo-600 font-semibold">
                  {user?.name?.[0]?.toUpperCase() || '?'}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <View className="ml-3">
            <Text className="text-sm text-gray-500">{getWelcomeMessage()}</Text>
            <Text className="text-lg font-semibold">
              {user?.name?.split(' ')[0] || 'Friend'}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-4">
          {showNotifications && (
            <TouchableOpacity 
              onPress={handleNotificationsPress}
              className="relative"
            >
              <Ionicons name="notifications-outline" size={24} color="#4F46E5" />
              {unreadNotifications > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {unreadNotifications > 99 ? '99+' : unreadNotifications}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {showMessages && (
            <TouchableOpacity 
              onPress={handleMessagesPress}
              className="relative"
            >
              <Ionicons name="mail-outline" size={24} color="#4F46E5" />
              {unreadMessages > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {unreadMessages > 99 ? '99+' : unreadMessages}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}