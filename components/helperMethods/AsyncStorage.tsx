import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, startOfWeek, startOfMonth, getISOWeek } from 'date-fns';
//structure of data
// {
//   "stepsData": {
//     "daily": {
//       "2024-09-10": { "steps": 8500, "distance": 6.5, "energy": 350 },
//       "2024-09-11": { "steps": 9000, "distance": 7.0, "energy": 400 },
//       ...
//     },
//     "weekly": {
//       "2024-W37": { "totalSteps": 56000, "distance": 40.0, "energy": 2500 },
//       ...
//     },
//     "monthly": {
//       "2024-09": { "totalSteps": 240000, "distance": 170.0, "energy": 12000 },
//       ...
//     }
//   }
// }



// Save daily steps
export const updateSteps = async (newSteps:number, newDistance:number, newEnergy:number) => {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    const weekKey = `W${getISOWeek(new Date())}`; // Get week number (W37)
    const monthKey = format(new Date(), 'yyyy-MM'); // Format as 'yyyy-MM'

    // Get stored steps data
    const storedData = await AsyncStorage.getItem('stepsData');
    const stepsData = storedData ? JSON.parse(storedData) : { daily: {}, weekly: {}, monthly: {} };

    // If today's data exists, update it; otherwise, create a new entry
    if (stepsData.daily[today]) {
      stepsData.daily[today].steps += newSteps;
      stepsData.daily[today].distance += newDistance;
      stepsData.daily[today].energy += newEnergy;
    } else {
      stepsData.daily[today] = { steps: newSteps, distance: newDistance, energy: newEnergy };
    }

    // Update weekly and monthly totals
    if (stepsData.weekly[weekKey]) {
      stepsData.weekly[weekKey].totalSteps += newSteps;
      stepsData.weekly[weekKey].distance += newDistance;
      stepsData.weekly[weekKey].energy += newEnergy;
    } else {
      stepsData.weekly[weekKey] = { totalSteps: newSteps, distance: newDistance, energy: newEnergy };
    }

    if (stepsData.monthly[monthKey]) {
      stepsData.monthly[monthKey].totalSteps += newSteps;
      stepsData.monthly[monthKey].distance += newDistance;
      stepsData.monthly[monthKey].energy += newEnergy;
    } else {
      stepsData.monthly[monthKey] = { totalSteps: newSteps, distance: newDistance, energy: newEnergy };
    }

    // Save updated steps data back to AsyncStorage
    await AsyncStorage.setItem('stepsData', JSON.stringify(stepsData));
    console.log('Steps data updated');
  } catch (error) {
    console.error('Error updating steps data:', error);
  }
};


///fetching of data
// Fetch daily step count data
export const getDailyData = async () => {
  try {
    const result = await AsyncStorage.getItem('stepsData');
    const stepsData = result ? JSON.parse(result) : { daily: {} };
    return stepsData.daily; // Return only daily steps data
  } catch (error) {
    console.error('Error fetching daily data:', error);
  }
};

// Fetch weekly step count data
export const getWeeklyData = async () => {
  try {
    const result = await AsyncStorage.getItem('stepsData');
    const stepsData = result ? JSON.parse(result) : { weekly: {} };
    return stepsData.weekly; // Return only weekly steps data
  } catch (error) {
    console.error('Error fetching weekly data:', error);
  }
};

// Fetch monthly step count data
export const getMonthlyData = async () => {
  try {
    const result = await AsyncStorage.getItem('stepsData');
    const stepsData = result ? JSON.parse(result) : { monthly: {} };
    return stepsData.monthly; // Return only monthly steps data
  } catch (error) {
    console.error('Error fetching monthly data:', error);
  }
};
