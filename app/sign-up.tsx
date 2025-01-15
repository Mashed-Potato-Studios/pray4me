import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import images from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'
import { register } from '@/lib/appwrite'

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    try {
      const response = await register(email, password, name)
      if (response) {
        Alert.alert('Success', 'Account created successfully')
        router.replace('/sign-in')
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to create account')
    }
  }

  return (
    <ImageBackground 
      source={images.onboarding} 
      className="flex-1"
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-white/70" />
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
          <View className="flex-1 justify-center py-8">
            <Text className="text-4xl font-bold text-center mb-3">Pray 4 Me</Text>
            <Text className="text-gray-600 text-center text-lg mb-12">Create an account to join our prayer community</Text>

            <View className="space-y-6 mb-12">
              <View className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-4">
                <TextInput
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  className="text-base"
                />
              </View>

              <View className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-4">
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="text-base"
                />
              </View>

              <View className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-4">
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="text-base"
                />
              </View>

              <View className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-4">
                <TextInput
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  className="text-base"
                />
              </View>

              <TouchableOpacity 
                className="bg-blue-600 rounded-xl py-4 mt-4"
                onPress={handleSignUp}
              >
                <Text className="text-white text-center font-semibold text-lg">Create Account</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-12">
              <View className="flex-1 h-[1px] bg-gray-400" />
              <Text className="mx-6 text-gray-600 text-base">Or continue with</Text>
              <View className="flex-1 h-[1px] bg-gray-400" />
            </View>

            <View className="flex-row justify-center space-x-6 mb-12">
              <TouchableOpacity className="bg-white/80 backdrop-blur-sm rounded-xl p-5">
                <Ionicons name="logo-google" size={28} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/80 backdrop-blur-sm rounded-xl p-5">
                <Ionicons name="logo-apple" size={28} color="#000000" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center">
              <Text className="text-gray-600 text-base">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/sign-in')}>
                <Text className="text-blue-600 font-semibold text-base">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default SignUp;
