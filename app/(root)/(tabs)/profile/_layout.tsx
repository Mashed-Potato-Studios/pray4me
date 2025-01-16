import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerShadowVisible: false,
        headerBackTitle: '',
        headerTintColor: '#4F46E5',
      }}
    />
  );
}
