import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Style from '../style'
import { SCREEN_WIDTH } from '../constants/constants'

const PrimaryButton = ({ children, onPress, outterWidth = SCREEN_WIDTH * 0.4, innerWidth = SCREEN_WIDTH * 0.37 }) => {
  return (
    <View style={[Style.primaryButton.outterContainer, { width: outterWidth }]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[Style.primaryButton.innerContainer, { width: innerWidth }]}>
          <Text style={Style.primaryButton.text}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default PrimaryButton
