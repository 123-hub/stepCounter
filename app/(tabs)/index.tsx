import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, StatusBar, TouchableOpacity } from "react-native";
import CircularProgressBar from "@/components/CircularProgressBar";

export default function HomeScreen() {
   const [first, setfirst] = useState(true)
  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.container} className="w-screen">
      <StatusBar
        barStyle="light-content" // Or 'dark-content' for a dark theme
        backgroundColor="#272b24" // The background color of the status bar
      />
        {/* Circular Progress Bar */}
          <CircularProgressBar />
        {/* Text element below the Circular Progress */}
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={()=> setfirst(!first)}><Text>hey</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#202020",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", // Center vertically
    alignItems: "center", // Center horizontally
    paddingHorizontal: 16,
  },
  textContainer: {
    alignItems: "center", // Center the text horizontally
  },
  text: {
    fontSize: 18,
    color: "#fff", // Adjust text color as needed
  },
});
