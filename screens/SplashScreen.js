import { Animated, Easing } from 'react-native'
import { useEffect, useRef } from 'react'
import Style from '../style'
import Images from '../assets/images/images'
import LogoScreenWrapper from '../components/LogoScreenWrapper'

const SplashScreen = ({ navigation }) => {
  const rotation = useRef(new Animated.Value(0)).current

  const rotateLogo = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000, // 3 seconds per full rotation
        easing: Easing.linear, // Continuous rotation
        useNativeDriver: true, // Improve performance
      })
    ).start()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login')
    }, 5000)

    rotateLogo() // Start rotation animation when the component mounts

    return () => {
      clearTimeout(timer)
    }
  }, [navigation])

  // Interpolating rotation from 0 to 360 degrees
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <LogoScreenWrapper
      backgroundColor="black"
      opacity={ 0.5}
    >
      <Animated.Image
        source={Images.go_dutch_split_button}
        style={[
          Style.splashScreen.logo,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
    </LogoScreenWrapper>
  )
}

export default SplashScreen
