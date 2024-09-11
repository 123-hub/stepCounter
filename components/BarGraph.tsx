import { View, Text, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";

const BarGraph = ({ data, high = 100 }: { data: any; high: number }) => {
  return (
    <SafeAreaView>
    <View>
      <BarChart
        style={{
          borderBlockColor: "#eb4034",
        }}
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        fromZero
        fromNumber={high}
        withVerticalLabels
        yAxisLabel=""
        yAxisSuffix=" k"
        showBarTops={false}
        showValuesOnTopOfBars={true}
        withInnerLines={false}
        withCustomBarColorFromData
        flatColor
        chartConfig={{
          
          backgroundColor: "#3443eb",
          backgroundGradientFrom: "#553fc4",
          backgroundGradientTo: "#6e55d5",
          decimalPlaces: 0,
          color: () => `rgba(0, 0, 0, 1)`, // Solid color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          formatTopBarValue: (value) => value.toFixed(0) + "k",
          barPercentage: 0.6,
          
        }}
      />
    </View>
    </SafeAreaView>
  );
};

export default BarGraph;
