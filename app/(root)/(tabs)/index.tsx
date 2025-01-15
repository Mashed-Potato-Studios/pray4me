import { Text, View } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl font-bold font-rubik">Welcome to the app</Text>
      <Link href="/profile">
        <Text>Profile</Text>
      </Link>
      <Link href="/prayers/1">
        <Text>Prayer</Text>
      </Link>
      <Link href="/sign-in">
        <Text>Sign In</Text>
      </Link>
    </View>
  );
}
