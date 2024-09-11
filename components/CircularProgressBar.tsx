import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { getTodaysSteps, saveSteps } from "./helperMethods/AsyncStorage";
import { Pedometer } from "expo-sensors";

const NestedCircularProgress = () => {
  const [stepCount, setStepCount] = useState(0);
  const [todaysPreviousCount, setTodaysPreviousCount] = useState(0);
  const [firstTimeUpdate, setFirstTimeUpdate] = useState(true);

  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.1, 0.6, 0.8],
  };
  useEffect(() => {
    const fetchAsyncStorage = async () => {
      try {
        let result = await getTodaysSteps();
        setTodaysPreviousCount(result);
        setStepCount(result);
        console.log("previous", result);
      } catch (error) {
        console.log("error in fetching previous data");
      }
    };

    fetchAsyncStorage();
  }, []);

  useEffect(() => {
    const subscription = Pedometer.watchStepCount((result) => {
      console.log("below", todaysPreviousCount, result.steps);
      setStepCount(todaysPreviousCount + result.steps);
    });

    return () => subscription && subscription.remove();
  }, [todaysPreviousCount]);

  useEffect(() => {
    if (firstTimeUpdate == false) {
      saveSteps(stepCount);
      console.log("saving data");
    } else {
      setFirstTimeUpdate(false);
    }
  }, [stepCount]);

  return (
    <View style={styles.container}>
      {/* Outer Progress Bar */}
      <AnimatedCircularProgress
        size={240}
        width={25}
        fill={75} // Outer progress fill percentage
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0} // Keep it at 0 to have the progress start from the top
        style={styles.outerProgress}
        lineCap="round"
      >
        {() => (
          <View style={styles.innerCircle}>
            {/* Inner Progress Bar */}
            <AnimatedCircularProgress
              size={180}
              width={25}
              fill={(stepCount / 10000) * 100} // Inner progress fill percentage
              tintColor="#00E676"
              backgroundColor="#bbf2d7"
              rotation={0}
              lineCap="round" // Keep it at 0 to have the progress start from the top
            >
              {() => (
                <>
                  <Text style={styles.stepCount}>{stepCount}</Text>
                  <Text style={styles.stepDescription}>of 10,000 steps</Text>
                </>
              )}
            </AnimatedCircularProgress>
            {/* SVG Icon */}
            <FontAwesome5
              name="shoe-prints"
              size={18} // Adjust size as needed
              color="white"
              style={styles.icon}
            />
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={styles.belowContainer}>
        <View><Text>h</Text></View>
        <View><Text>h</Text></View>
        <View><Text>h</Text></View>
        <View><Text>hz</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingTop: 270,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  outerProgress: {
    position: "absolute",
  },
  stepCount: {
    fontSize: 30,
    fontWeight: "bold",
  },
  stepDescription: {
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    top: 0, // Adjust to position at the top of the inner circle
    left: "50%", // Center horizontally
    transform: [{ translateX: -12 }, { translateY: 2 }], // Adjust to center the icon
  },
  belowContainer:{
    position:"relative"
  }
});

export default NestedCircularProgress;
