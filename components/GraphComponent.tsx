import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import BarGraph from "./BarGraph";
import { clearData, feedData, getDailyData, getMonthlyData, getWeeklyData } from "./helperMethods/AsyncStorage";
import { formatDailyDate } from "./helperMethods/dataFormatter";

export default function GraphComponent() {
  const labelDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thrusday",
    "friday",
    "saturday",
  ];
  const [getHorizontalLabel, setHorizontalLabel] = useState<String[]>([]);
  let date = new Date();

  useEffect(() => {
    let daysLabel = [];
    for (let i = date.getDay(); i < date.getDay() + 7; i++) {
      daysLabel.push(labelDays[i % 7].toUpperCase().slice(0, 1));
    }
    setHorizontalLabel(daysLabel);
  }, []);

  useEffect(() => {
    const lastDate = "2024-08-03"; // Last date to stop at (26 Aug)
  });
  getDailyData().then((data) =>  {
    let arrays = Object.keys(data);
     for(let each of arrays)
     {
        console.log(formatDailyDate(each));
     }
  }).catch((e) => console.log(e));
  const data = {
    labels: getHorizontalLabel,
    color: "#eb4034",
    datasets: [
      {
        data: [0, 0, 10, 0, 0, 0, 0],
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
        <BarGraph data={data} high={100} />
        
        <TouchableOpacity onPress={async() => {
          await feedData();
        }}><Text>FEEDDATA</Text></TouchableOpacity>
        <TouchableOpacity onPress={async() => {
          await clearData();
        }}><Text>clearData</Text></TouchableOpacity>
     
      </View>
    </SafeAreaView>
  );
}
