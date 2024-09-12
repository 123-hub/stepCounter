import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, getISOWeek } from "date-fns";

// Mock data to feed into AsyncStorage
const data = {
  stepsData: {
    daily: {
      "2024-08-13": { steps: 7200, distance: 5.4, energy: 315 },
      "2024-08-14": { steps: 7300, distance: 5.5, energy: 320 },
      "2024-09-10": { steps: 10000, distance: 8.2, energy: 455 },
      "2024-09-11": { steps: 10100, distance: 8.3, energy: 460 },
    },
    weekly: {
      "2024-W32": { totalSteps: 50000, distance: 36.5, energy: 2200 },
      "2024-W33": { totalSteps: 52000, distance: 38.0, energy: 2300 },
      "2024-W41": { totalSteps: 60000, distance: 46.0, energy: 2700 },
    },
    monthly: {
      "2024-07": { totalSteps: 150000, distance: 110.0, energy: 9500 },
      "2024-08": { totalSteps: 165000, distance: 120.0, energy: 10500 },
      "2024-09": { totalSteps: 20000, distance: 15.0, energy: 1300 },
    },
  },
};

// Update steps based on new data
export const updateSteps = async (newSteps:number, newDistance:number, newEnergy:number) => {
  try {
    const today = format(new Date(), "yyyy-MM-dd");
    const weekKey = `W${getISOWeek(new Date())}`;
    const monthKey = format(new Date(), "yyyy-MM");

    const storedData = await AsyncStorage.getItem("stepsData");
    const stepsData = storedData
      ? JSON.parse(storedData).stepsData
      : { daily: {}, weekly: {}, monthly: {} };

    // Update daily steps
    let differenceObject = {
      "steps": newSteps - stepsData.daily[today].steps,
       "distance": newDistance - stepsData.daily[today].distance,
       "energy" : newEnergy  - stepsData.daily[today].energy
    }
    if (stepsData.daily[today]) {
      stepsData.daily[today].steps = newSteps;
      stepsData.daily[today].distance = newDistance;
      stepsData.daily[today].energy = newEnergy;
    } else {
      stepsData.daily[today] = {
        steps: newSteps,
        distance: newDistance,
        energy: newEnergy,
      };
    }

    // Update weekly steps
    if (stepsData.weekly[weekKey]) {
      stepsData.weekly[weekKey].totalSteps += differenceObject.steps;
      stepsData.weekly[weekKey].distance += differenceObject.distance;
      stepsData.weekly[weekKey].energy += differenceObject.energy;
    } else {
      stepsData.weekly[weekKey] = {
        totalSteps: newSteps,
        distance: newDistance,
        energy: newEnergy,
      };
    }

    // Update monthly steps
    if (stepsData.monthly[monthKey]) {
      stepsData.monthly[monthKey].totalSteps += differenceObject.steps;
      stepsData.monthly[monthKey].distance += differenceObject.distance;
      stepsData.monthly[monthKey].energy += differenceObject.energy;
    } else {
      stepsData.monthly[monthKey] = {
        totalSteps: newSteps,
        distance: newDistance,
        energy: newEnergy,
      };
    }

    await AsyncStorage.setItem("stepsData", JSON.stringify({ stepsData }));
    console.log("Steps data updated");
  } catch (error) {
    console.error("Error updating steps data:", error);
  }
};

// Feed mock data into AsyncStorage
export const feedData = async () => {
  try {
    await AsyncStorage.removeItem("stepsData");
    await AsyncStorage.setItem("stepsData", JSON.stringify(data));
    const all = await AsyncStorage.getItem("stepsData");
    console.log("Data fed successfully", all);
  } catch (error) {
    console.error("Error feeding data:", error);
  }
};

// Clear all steps data
export const clearData = async () => {
  try {
    await AsyncStorage.removeItem("stepsData");
    console.log("Data cleared successfully");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};

// Get today's steps data
export const getTodaysData = async () => {
  try {
    const today = format(new Date(), "yyyy-MM-dd");
    const result = await AsyncStorage.getItem("stepsData");
    const stepsData = result ? JSON.parse(result).stepsData : { daily: {} };
    console.log("Today's Data:", stepsData.daily[today]);
    return stepsData.daily[today] || {};
  } catch (error) {
    console.error("Error fetching daily data:", error);
    return {};
  }
};

// Get a specific day's steps data
export const getDailyData = async () => {
  try {
    const result = await AsyncStorage.getItem("stepsData");
    if (!result) {
      console.error("stepsData not found in AsyncStorage");
      return {};
    }
    const stepsData = JSON.parse(result).stepsData;
    const dailyData = stepsData?.daily || {};

    // Fetch data for a specific day
    if (dailyData["2024-08-13"]) {
      console.log("dailyData for 2024-08-13:", dailyData["2024-08-13"]);
    } else {
      console.error("No data found for 2024-08-13");
    }

    return dailyData;
  } catch (error) {
    console.error("Error fetching or parsing daily data:", error);
    return {};
  }
};

// Get weekly steps data
export const getWeeklyData = async () => {
  try {
    const result = await AsyncStorage.getItem("stepsData");
    const stepsData = result ? JSON.parse(result).stepsData : { weekly: {} };
    return stepsData.weekly;
  } catch (error) {
    console.error("Error fetching weekly data:", error);
    return {};
  }
};

// Get monthly steps data
export const getMonthlyData = async () => {
  try {
    const result = await AsyncStorage.getItem("stepsData");
    const stepsData = result ? JSON.parse(result).stepsData : { monthly: {} };
    return stepsData.monthly;
  } catch (error) {
    console.error("Error fetching monthly data:", error);
    return {};
  }
};
