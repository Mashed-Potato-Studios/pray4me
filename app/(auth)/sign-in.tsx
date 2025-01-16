import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Alert, ActivityIndicator, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import images from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'
import { login, loginWithEmail, signUpWithEmail } from '@/lib/appwrite'
import { useGlobalContext } from '@/providers/global-provider'

export default function SignIn() {
  const { refetch } = useGlobalContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailAuth = async () => {
    if (!email || !password || (isSignUp && !name)) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name)
      } else {
        await loginWithEmail(email, password)
      }
      await refetch()
    } catch (error: any) {
      console.error(error)
      Alert.alert('Error', error?.message || 'Authentication failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const response = await login()
      if (response) {
        await refetch()
      } else {
        Alert.alert('Error', 'Sign in failed. Please try again.')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'An unexpected error occurred')
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
            <Text className="text-4xl font-bold text-center mb-3">Pray~ed</Text>
            <Text className="text-gray-600 text-center text-xl mb-12">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </Text>

            <View className="space-y-4 mb-8">
              {isSignUp && (
                <View className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-4">
                  <TextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    className="text-base"
                  />
                </View>
              )}

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
            </View>

            <TouchableOpacity
              className="bg-indigo-600 rounded-xl py-4 mb-4"
              onPress={handleEmailAuth}
              disabled={isSubmitting}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isSubmitting ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsSignUp(!isSignUp)}
              className="mb-8"
            >
              <Text className="text-center text-gray-600 text-base">
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center mb-8">
              <View className="flex-1 h-[1px] bg-gray-400" />
              <Text className="mx-6 text-gray-600 text-base">Or continue with</Text>
              <View className="flex-1 h-[1px] bg-gray-400" />
            </View>

            <TouchableOpacity
              className="bg-white/80 backdrop-blur-sm rounded-xl py-4 px-6 flex-row justify-center items-center"
              onPress={handleGoogleSignIn}
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text className="ml-3 font-semibold text-base">Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}
