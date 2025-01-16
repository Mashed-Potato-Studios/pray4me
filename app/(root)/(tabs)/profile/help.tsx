import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function HelpCenter() {
  const faqs = [
    {
      question: 'How do I create a prayer request?',
      answer: 'To create a prayer request, tap the "+" button on the home screen and fill in the details of your prayer request. You can make it public or private.'
    },
    {
      question: 'Can I pray for others anonymously?',
      answer: 'Yes, you can choose to pray anonymously for others by toggling the "Anonymous" option when interacting with prayer requests.'
    },
    {
      question: 'How do I join a prayer group?',
      answer: 'You can join prayer groups by browsing the "Groups" tab and tapping "Join" on any group that interests you.'
    },
    {
      question: 'How do I change my notification settings?',
      answer: 'Go to Profile > Notifications to customize your notification preferences for prayers, groups, and other activities.'
    },
    {
      question: 'Is my prayer request private?',
      answer: 'By default, prayer requests are private. You can choose to make them public or share them with specific groups when creating the request.'
    }
  ]

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Help Center' }} />
      
      <View className="p-6">
        <Text className="text-xl font-semibold mb-6">Frequently Asked Questions</Text>
        
        <View className="space-y-4">
          {faqs.map((faq, index) => (
            <View key={index} className="bg-white rounded-xl p-4">
              <View className="flex-row items-start">
                <Ionicons name="help-circle-outline" size={24} color="#4F46E5" />
                <Text className="font-medium ml-3 flex-1">{faq.question}</Text>
              </View>
              <Text className="text-gray-600 mt-2 ml-9">{faq.answer}</Text>
            </View>
          ))}
        </View>

        <View className="mt-8 space-y-4">
          <Text className="text-xl font-semibold mb-2">Still need help?</Text>
          
          <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center">
            <Ionicons name="mail-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 font-medium">Contact Support</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color="#9CA3AF"
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center">
            <Ionicons name="document-text-outline" size={24} color="#4F46E5" />
            <Text className="ml-3 font-medium">View Documentation</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color="#9CA3AF"
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
