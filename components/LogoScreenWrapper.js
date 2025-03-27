import { Image, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '../assets/images/images'
import Style from '../style'

const LogoScreenWrapper = ({ children, backgroundColor = '#E9F0FAF2', opacity = 0.1 }) => {
  return (
    <SafeAreaView style={Style.logoScreenWrapper}>
      <ImageBackground
        source={Images.go_dutch_background}
        style={[Style.logoScreenWrapper.imageBackground, { backgroundColor }]}
        imageStyle={[Style.logoScreenWrapper.imageBackground.imageBackgroundStyle, { opacity }]}
      >
        <Image
          source={Images.go_dutch_logo}
          style={Style.logoScreenWrapper.imageBackground.logo}
        />
        {children}
      </ImageBackground>
    </SafeAreaView>
  )
}

export default LogoScreenWrapper
