import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getTodaysData, updateSteps } from "./helperMethods/AsyncStorage";
import { Pedometer } from "expo-sensors";

const NestedCircularProgress = () => {
  const [todayData, setTodaysData] = useState({ steps: 0, distance: 0, energy: 0 });
  const [todaysPreviousData, setTodaysPreviousData] = useState({ steps: 0, distance: 0, energy: 0 });
  const isInitialMount = useRef(true); // Use a ref to track the initial mount

  useEffect(() => {
    const fetchAsyncStorage = async () => {
      try {
        const result = await getTodaysData();
        setTodaysPreviousData(result);
        setTodaysData(result);
      } catch (error) {
        console.error("Error fetching previous data:", error);
      }
    };

    fetchAsyncStorage();
  }, []);

  useEffect(() => {
    const subscription = Pedometer.watchStepCount((result) => {
      console.log("pedometer", result);

      setTodaysData((prev) => {
        let steps = todaysPreviousData?.steps + result.steps;
        let distance = todaysPreviousData?.distance + 1; // Adjust calculation
        let energy = todaysPreviousData?.energy + 1;   // Adjust calculation
        return { steps, distance, energy };
      });
    });

    return () => subscription && subscription.remove();
  }, [todaysPreviousData]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; // Set to false after the first update
    } else {
      console.log("Updating steps data");
      updateSteps(todayData.steps, todayData.distance, todayData.energy)
        .then(() => console.log("Data saved successfully"))
        .catch((error) => console.error("Error saving data:", error));
    }
  }, [todayData]);

  return (
    <View style={styles.container} className="w-full">
      <View style={styles.AnimatedCircularBox}>
        <View style={styles.innerCircle}>
          <AnimatedCircularProgress
            size={250}
            width={20}
            fill={(todayData.steps / 10000) * 100}
            tintColor="black"
            backgroundColor="#aaaba9"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <>
                <Text style={styles.stepCount}>{todayData?.steps || 0}</Text>
                <Text style={styles.stepDescription}>of 10,000 steps</Text>
              </>
            )}
          </AnimatedCircularProgress>
          <FontAwesome5
            name="shoe-prints"
            size={14}
            color="white"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.belowContainer}>
        <View style={styles.infoContainer}>
          <MaterialIcons name="route" size={36} color="black" />
          <Text style={styles.infoText}>{todayData.distance?.toFixed(1) || 0} km</Text>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="fire" size={36} color="black" />
          <Text style={styles.infoText}>{todayData.energy?.toFixed(0) || 0} kcal</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20,
    backgroundColor: "#FEFF1E",
    borderRadius: 20,
    paddingVertical: 16,
  },
  AnimatedCircularBox: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
  stepCount: {
    fontSize: 50,
    fontWeight: "bold",
  },
  stepDescription: {
    fontWeight: "400",
  },
  icon: {
    position: "absolute",
    top: 10,
    left: "50%",
    transform: [{ translateX: -30 }],
  },
  belowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  infoContainer: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default NestedCircularProgress;
