import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-600">
      <Text className="text-white">ProfileScreen!</Text>
    </SafeAreaView>
  );
}
