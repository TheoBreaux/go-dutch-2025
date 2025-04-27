import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const CheckCloseOutDetailsScreen = ({ route }) => {
  const state = useSelector((state) => state.app)
  const { finalBill, eventTitle } = route.params

  console.log(finalBill)
  console.log('IN CHECK CLOSE EVENT TITLTE:', eventTitle)

  return (
    <View>
      <Text>CheckCloseOutDetailsScreen</Text>
    </View>
  )
}

export default CheckCloseOutDetailsScreen
