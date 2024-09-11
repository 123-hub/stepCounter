import { Tabs } from "expo-router";
import React from "react";
import HeaderHomePage from "@/components/HeaderHomePage";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#2196F3",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 100,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "white",
        headerShown: false,
      }}
      initialRouteName="history"
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "paper-plane" : "paper-plane-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle(props) {
              return <HeaderHomePage/>
          },
          
          headerShadowVisible: true,
          title: "home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "setting",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
