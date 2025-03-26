import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/constants'
import { scaleFont } from './utils/utils'

const containerWidth = SCREEN_WIDTH * 0.9 // 90% of screen width
const containerHeight = SCREEN_HEIGHT * 0.1 // 10% of screen height
const containerBorderRadius = scaleFont(15)

console.log('HEIGHT:', SCREEN_HEIGHT)
console.log('WIDTH:', SCREEN_WIDTH)

export default StyleSheet.create({
  // =============================================================== SPLASH SCREEN
  splashScreen: {
    logo: { marginTop: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.6, height: SCREEN_WIDTH * 0.6, resizeMode: 'contain' },
  },

  // =============================================================== LOGO SCREEN WRAPPER
  logoScreenWrapper: {
    flex: 1,
    alignItems: 'center',
    imageBackground: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 20,
      imageBackgroundStyle: { resizeMode: 'repeat', width: '100%' },
      logo: { resizeMode: 'contain', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.1 },
    },
  },
})
