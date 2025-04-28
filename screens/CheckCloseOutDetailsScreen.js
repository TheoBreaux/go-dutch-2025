import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { PRETTIFY } from '../utils/utils'

const CheckCloseOutDetailsScreen = ({ route }) => {
  const state = useSelector((state) => state.app)
  const { finalBill, eventTitle } = route.params

  console.log(state)

  // console.log(finalBill)
  // console.log('IN CHECK CLOSE EVENT TITLTE:', eventTitle)

  PRETTIFY(finalBill)

  return (
    <View>
      <Text>CheckCloseOutDetailsScreen</Text>
    </View>
  )
}

export default CheckCloseOutDetailsScreen
