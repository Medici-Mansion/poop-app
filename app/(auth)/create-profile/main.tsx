import { Button } from "@/components/ui";
import { AnimatedPressable } from "@/components/ui/animate-pressable";
import { Link, router } from "expo-router";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainPage = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-gray-600 flex-1 px-4"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View
        className="flex items-center justify-center"
        style={{ marginTop: 120 - insets.top }}
      >
        <Text className="text-white text-head-sb24 font-semibold">
          풉에 오신걸 환영해요!
        </Text>
        <Text className="text-white text-head-sb24 font-semibold mt-1">
          반려견 프로필을 완성해보세요
        </Text>
        <Text className="text-body-m14 text-gray-200 mt-4">
          반려견이 없다면 '나중에'를 클릭해주세요.
        </Text>
      </View>
      <View style={{ flex: 1 }} className="flex flex-col justify-end py-6">
        <View className="space-y-6">
          <Button
            label="반려견 프로필 만들기"
            className="bg-white py-4 flex items-center justify-center rounded-2xl"
            onPress={() => router.push("/create-profile/create")}
          />

          <Link asChild href="/(auth)/(tabs)/home">
            <AnimatedPressable>
              <Text className="text-[#959595] text-center">나중에</Text>
            </AnimatedPressable>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default MainPage;
