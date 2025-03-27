import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import Style from '../style'
import Images from '../assets/images/images'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import VideoSource from '../assets/videos/featured_restaurant.mp4'
import { useVideoPlayer, VideoView } from 'expo-video'

const LoginScreen = ({ navigation }) => {
  const ref = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const player = useVideoPlayer(VideoSource, (player) => {
    player.loop = true
    player.play()
  })

  useEffect(() => {
    const videoSubscription = player.addListener('playingChange', (isPlaying) => {
      setIsPlaying(isPlaying)
    })

    const onEndVideoSubscription = player.addListener('end', () => {
      setIsPlaying(false)
    })

    return () => {
      videoSubscription.remove()
      onEndVideoSubscription.remove()
    }
  }, [player])

  return (
    <View style={Style.logInScreen.container}>
      <View style={{ height: SCREEN_HEIGHT * 0.5, width: SCREEN_WIDTH }}>
        <VideoView
          ref={ref}
          player={player}
          style={{ width: '100%', height: '100%' }}
          allowsFullscreen
          contentFit="fill"
          nativeControls={true}
        />
      </View>
      <TouchableOpacity>
        <Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: 40, width: SCREEN_WIDTH * 0.9 }}>Elements Bar & Grill</Text>
      </TouchableOpacity>

      <View style={Style.logInScreen.container.modal}>
        <Image
          source={Images.go_dutch_background}
          style={Style.logInScreen.container.modal.backgroundImage}
        />

        <View style={Style.logInScreen.container.modal.inputsContainer}>
          <Text style={Style.registrationScreen.inputLabels}>Username</Text>
          <TextInput style={Style.registrationScreen.textInput} />
          <Text style={Style.registrationScreen.inputLabels}>Password</Text>
          <View style={Style.logInScreen.container.modal.passwordInput}>
            <TextInput
              style={[Style.registrationScreen.textInput, { width: '100%' }]}
              secureTextEntry
            />
            <TouchableOpacity style={Style.logInScreen.container.modal.passwordInput.passwordIcon}>
              <Ionicons
                name="eye-off-outline"
                size={24}
                color={COLORS.goDutchRed}
              />
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          onPress={() => {
            player.pause()
            navigation.navigate('Tabs', { screen: 'Home' })
          }}
        >
          Log In
        </PrimaryButton>
      </View>
    </View>
  )
}

export default LoginScreen
