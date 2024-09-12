import { View, StyleSheet } from 'react-native';
import { Tabs } from "expo-router";
import React from "react";
import HeaderHomePage from "@/components/HeaderHomePage";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabBarColor = "#FFF95B"; // Tab bar background color

  return (
    <View style={[styles.container, { backgroundColor: "#202020" }]}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: tabBarColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 100,
          },
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarInactiveTintColor: "#202020",
          headerShown: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#202020",
          },
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
              return <HeaderHomePage />;
            },
            headerShadowVisible: false,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
