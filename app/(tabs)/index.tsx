import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  ProgressBarAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import { Pedometer } from "expo-sensors";
import {
  saveSteps,
  getTodaysSteps,
} from "../../components/helperMethods/AsyncStorage";
import { ProgressChart } from "react-native-chart-kit";
import CircularProgressBar from "@/components/CircularProgressBar";

export default function HomeScreen() {
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CircularProgressBar />
      </View>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 0, // Adjust this value to match the header height if needed
  },
  container: {
    display:"flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
