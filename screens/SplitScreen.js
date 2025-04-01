import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import Images from '../assets/images/images'
import { COLORS } from '../constants/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const SplitScreen = () => {
  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={Style.splitScreen.container}>
        <Text style={Style.splitScreen.container.heading}>Tap camera to upload your receipt and add an event title.</Text>
        <Image
          source={Images.split_screen_dining}
          style={Style.splitScreen.container.image}
        />
        <TouchableOpacity style={Style.splitScreen.container.button}>
          <MaterialCommunityIcons
            name="camera"
            size={70}
            color={COLORS.goDutchRed}
          />
        </TouchableOpacity>
      </View>
    </LogoScreenWrapper>
  )
}

export default SplitScreen
