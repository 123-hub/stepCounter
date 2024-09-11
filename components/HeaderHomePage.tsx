import { View, Text } from 'react-native'
import React from 'react'

const HeaderHomePage = () => {
  return (
    <View className = "flex-row w-full justify-between items-center">
       <View><Text>profile</Text></View>
       <View><Text>NOTIFICATION</Text></View>
    </View>
  )
}

export default HeaderHomePage