import { useRef, useEffect } from 'react'
import { Animated, Easing, View, Text } from 'react-native'
import Styles from '../style'
import Images from '../assets/images/images'

const ReceiptAnalyzingScreen = () => {
  const rotation = useRef(new Animated.Value(0)).current

  const rotateLogo = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear, // Continuous rotation
        useNativeDriver: true,
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
    <View style={Styles.receiptAnalyzingScreen.container}>
      <Animated.Image
        source={Images.go_dutch_split_button}
        style={[Styles.receiptAnalyzingScreen.container.image, { transform: [{ rotate: rotateInterpolate }] }]}
      />
      <Text style={Styles.receiptAnalyzingScreen.container.text}>Analyzing receipt...</Text>
    </View>
  )
}

export default ReceiptAnalyzingScreen
