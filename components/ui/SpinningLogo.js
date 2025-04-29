import { Animated, Easing } from 'react-native'
import { useEffect, useRef } from 'react'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { SCREEN_HEIGHT } from '../../constants/constants'

const SpinningLogo = ({ marginTop = SCREEN_HEIGHT * 0.2 }) => {
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
    rotateLogo()
  }, [])

  // Interpolating rotation from 0 to 360 degrees
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.Image
      source={Images.go_dutch_split_button}
      style={[
        Styles.splashScreen.logo,
        {
          marginTop,
          transform: [{ rotate: rotateInterpolate }],
        },
      ]}
    />
  )
}

export default SpinningLogo
