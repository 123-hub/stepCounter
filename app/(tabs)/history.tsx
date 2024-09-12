import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {} from '../../components/helperMethods/dataFormatter';
import BarGraph from "@/components/BarGraph";
import { getWeeklyData } from "@/components/helperMethods/AsyncStorage";
import GraphComponent from "@/components/GraphComponent";

export default function TabTwoScreen() {


  return <>
  <SafeAreaView>
    <GraphComponent/>
  </SafeAreaView>
  </>
}
