import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Alert, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import images from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'
import { login, loginWithEmail, signUpWithEmail } from '@/lib/appwrite'
import { useGlobalContext } from '@/providers/global-provider'

function SignIn() {
  const { isLoggedIn, user, loading, refetch } = useGlobalContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isLoggedIn && user) {
      router.replace('/(tabs)')
    }
  }, [isLoggedIn, user])

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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    )
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
            <Text className="text-xl text-center mb-8">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </Text>

            {isSignUp && (
              <View className="mb-4">
                <TextInput
                  className="bg-white p-4 rounded-lg mb-2"
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View className="mb-4">
              <TextInput
                className="bg-white p-4 rounded-lg mb-2"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <TextInput
                className="bg-white p-4 rounded-lg mb-2"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className="bg-indigo-600 p-4 rounded-lg mb-4"
              onPress={handleEmailAuth}
              disabled={isSubmitting}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isSubmitting ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsSignUp(!isSignUp)}
              className="mb-6"
            >
              <Text className="text-center text-gray-600">
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500">or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <TouchableOpacity
              className="bg-white flex-row justify-center items-center p-4 rounded-lg"
              onPress={handleGoogleSignIn}
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text className="ml-2 font-semibold">Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default SignIn;
