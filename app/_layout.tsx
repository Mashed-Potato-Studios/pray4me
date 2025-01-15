import { Stack, useSegments, useRouter } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { GlobalProvider, useGlobalContext } from "../providers/global-provider";
import { View, ActivityIndicator } from "react-native";

// Handle authentication redirects
function AuthenticationGuard({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const router = useRouter();
  const { isLoggedIn, loading } = useGlobalContext();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isLoggedIn && !inAuthGroup) {
      // Redirect to sign-in if not logged in and not in auth group
      router.replace("/(auth)/sign-in");
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect to tabs if logged in and trying to access auth pages
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, segments, loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return <>{children}</>;
}

function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <AuthenticationGuard>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthenticationGuard>
    </GlobalProvider>
  );
}

export default RootLayout;
