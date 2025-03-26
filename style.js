import { StyleSheet } from 'react-native'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/constants'
import { scaleFont } from './utils/utils'

const containerWidth = SCREEN_WIDTH * 0.9 // 90% of screen width
const containerHeight = SCREEN_HEIGHT * 0.1 // 10% of screen height
const containerBorderRadius = scaleFont(15)

export default StyleSheet.create({
  // =============================================================== PRIMARY BUTTON
  primaryButton: {
    outterContainer: {
      width: SCREEN_WIDTH * 0.4,
      height: SCREEN_HEIGHT * 0.075,
      borderRadius: 5,
      borderWidth: 2,
      margin: SCREEN_WIDTH * 0.025,
      overflow: 'hidden',
      borderColor: COLORS.goDutchBlue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      backgroundColor: COLORS.goDutchRed,
      width: SCREEN_WIDTH * 0.37,
      height: SCREEN_HEIGHT * 0.06,
      borderRadius: 5,
      borderColor: COLORS.goDutchBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: { color: 'whitesmoke', fontSize: scaleFont(18), fontFamily: 'Poppins-Bold' },
  },

  // =============================================================== SPLASH SCREEN
  splashScreen: {
    logo: { marginTop: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.6, height: SCREEN_WIDTH * 0.6, resizeMode: 'contain' },
  },

  // =============================================================== LOGO SCREEN WRAPPER
  logoScreenWrapper: {
    flex: 1,
    alignItems: 'center',
    imageBackground: {
      position: 'absolute',
      top: SCREEN_HEIGHT * 0.03,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      flex: 1,
      alignItems: 'center',
      paddingTop: 20,
      imageBackgroundStyle: { resizeMode: 'repeat', width: '100%' },
      logo: { resizeMode: 'contain', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.1 },
    },
  },

  // =============================================================== LOGIN SCREEN
  loginScreen: {
    header: { fontFamily: 'Poppins-ExtraBold', fontSize: scaleFont(30), marginTop: SCREEN_HEIGHT * 0.05, textAlign: 'center' },
    icon: {
      marginTop: SCREEN_HEIGHT * 0.015,
      width: SCREEN_WIDTH * 0.5,
      height: SCREEN_HEIGHT * 0.25,
      resizeMode: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: SCREEN_HEIGHT * 0.025,
    },
    patternImage: { marginTop: SCREEN_HEIGHT * 0.025, height: SCREEN_HEIGHT * 0.6, resizeMode: 'center' },
  },
})
