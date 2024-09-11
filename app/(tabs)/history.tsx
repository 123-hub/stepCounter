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
import {getWeeksArray} from '../../components/helperMethods/dataFormatter';
import BarGraph from "@/components/BarGraph";

export default function TabTwoScreen() {

  const labelDays = ["sunday","monday","tuesday","wednesday","thrusday","friday","saturday"];
  const [getHorizontalLabel,setHorizontalLabel] = useState<String[]>([]);
  let date = new Date();
  
  
  useEffect(()=> {
    let daysLabel = [];
    for(let i=date.getDay();i<(date.getDay()+7);i++)
    {
      daysLabel.push(labelDays[i%7].toUpperCase().slice(0,1))
    }
    setHorizontalLabel(daysLabel);
  },[])

  useEffect(()=> {
    const lastDate = "2024-08-03"; // Last date to stop at (26 Aug)
 console.log(getWeeksArray(lastDate))
  },[]);


  console.log("label" ,getHorizontalLabel)
  const data = {
    labels: getHorizontalLabel,
    color: "#eb4034",
    datasets: [
      {
        data: [
       0,0,0,0,0,0,0
        ],
        colors: [
        
          (opacity = 1) => `rgba(85, 63, 196, ${opacity})`,
          (opacity = 1) => `rgba(85, 63, 196, ${opacity})`,
          (opacity = 1) => `rgba(85, 63, 196, ${opacity})`,
          (opacity = 1) => `rgba(85, 63, 196, ${opacity})`,
          (opacity = 1) => `rgba(85, 63, 196, ${opacity})`,
          (opacity = 1) => `rgba(85, 63, 196, ${opacity})`,
          (opacity = 1) => `rgba(85, 63, 196, ${opacity})`,
        ],
      },
    ],
  };
  return (
    <SafeAreaView>
      <View>
  
  <BarGraph data= {data} high={100}/>


      </View>
    </SafeAreaView>
  );
}
