import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 65,
          paddingHorizontal: 16,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#6B7280",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ size }) => (
            <View style={{
              width: 50,
              height: 50,
              backgroundColor: "#4F46E5",
              borderRadius: 25,
              marginBottom: 24,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#4F46E5",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}>
              <Ionicons name="add" size={30} color="white" />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => router.push("/prayers/add-prayer")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}