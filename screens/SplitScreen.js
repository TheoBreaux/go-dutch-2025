import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import Images from '../assets/images/images'
import { COLORS } from '../constants/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const SplitScreen = () => {
  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={Styles.splitScreen.container}>
        <Text style={Styles.splitScreen.container.heading}>Tap camera to upload your receipt and add an event title.</Text>
        <Image
          source={Images.dining_detail}
          style={Styles.splitScreen.container.image}
        />
        <TouchableOpacity style={Styles.splitScreen.container.button}>
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
