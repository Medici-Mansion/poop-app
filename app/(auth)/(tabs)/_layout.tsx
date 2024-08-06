import { Community, HomeActive, Profile, Search } from "@/assets/icons";
import { UploadButton } from "@/components/upload-icon";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        lazy: true,
        tabBarStyle: {
          backgroundColor: "#121212",
          height: 72 + 20,
        },
        headerShown: false,
        tabBarShowLabel: false,
        headerTransparent: true,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: "spring",
          },
          hide: {
            animation: "spring",
          },
        },
      }}
      initialRouteName="home"
      backBehavior="history"
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused, color }) => {
            return <HomeActive color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "search",
          tabBarIcon: ({ color, focused, size }) => (
            <Search fontSize={30} width={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="make-toon"
        listeners={({}) => ({
          tabPress: (event) => {
            event.preventDefault();
          },
        })}
        options={{
          headerShown: false,
          title: "Upload",
          lazy: true,
          tabBarIcon: UploadButton,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Upload",
          tabBarIcon: Community,
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "profile",
          tabBarIcon: Profile,
        }}
      />
    </Tabs>
  );
}
