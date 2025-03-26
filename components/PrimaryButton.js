import { View, Text, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'
import Style from '../style'
import Images from '../assets/images/images'
import { COLORS } from '../constants/constants'

const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={Style.primaryButton.outterContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={Style.primaryButton.innerContainer}>
          <Text style={Style.primaryButton.text}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default PrimaryButton
