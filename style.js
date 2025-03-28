import { StyleSheet } from 'react-native'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/constants'
import { scaleFont } from './utils/utils'

const containerWidth = SCREEN_WIDTH * 0.9 // 90% of screen width
const containerHeight = SCREEN_HEIGHT * 0.1 // 10% of screen height
const containerBorderRadius = scaleFont(15)

export default StyleSheet.create({
  // ================================================================================================================================== FAVORITES ICON
  favoritesIcon: { backgroundColor: COLORS.favoritesIconBackground, padding: 5, borderRadius: 30 },

  // ================================================================================================================================== TAB BAR
  tabBar: {
    tabBarStyle: { backgroundColor: COLORS.goDutchBlue, height: 65 },
    tabBarLabelStyle: { color: 'white', marginTop: 5, fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(12) },
  },

  // ================================================================================================================================== SCROLL PAGE HEADER
  scrollPageHeader: {
    container: {
      marginTop: SCREEN_HEIGHT * 0.05,
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.075,
      borderBottomWidth: 5,
      borderBlockEndColor: COLORS.goDutchBlue,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      text: { fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(30), color: COLORS.goDutchRed, letterSpacing: 1 },
    },
  },
  // ================================================================================================================================== FAVORITES BUTTON
  favoritesButton: {
    container: {
      backgroundColor: 'white',
      width: '47%',
      justifyContent: 'center',
      alignItems: 'center',
      height: SCREEN_HEIGHT * 0.075,
      borderBottomWidth: 5,
      borderBlockEndColor: COLORS.goDutchBlue,
      borderRadius: 10,
      elevation: 10,
      text: { fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(24), color: COLORS.goDutchRed, letterSpacing: 1 },
    },
  },

  // ================================================================================================================================== PRIMARY BUTTON
  primaryButton: {
    outterContainer: {
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
      height: SCREEN_HEIGHT * 0.06,
      borderRadius: 5,
      borderColor: COLORS.goDutchBlue,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: { color: 'whitesmoke', fontSize: scaleFont(18), fontFamily: 'Poppins-Bold' },
  },

  // ====================================================================================================================================== SPLASH SCREEN
  splashScreen: {
    logo: { marginTop: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.6, height: SCREEN_HEIGHT * 0.325, resizeMode: 'contain' },
  },

  // ======================================================================================================================================= LOGO SCREEN WRAPPER
  logoScreenWrapper: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    imageBackground: {
      position: 'absolute',
      top: SCREEN_HEIGHT * 0.04,
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

  // ====================================================================================================================================== WELCOME SCREEN
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

  // ======================================================================================================================================= REGISTRATION SCREEN
  registrationScreen: {
    inputLabels: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(16) },
    textInput: {
      fontFamily: 'Poppins-Regular',
      fontSize: scaleFont(18),
      backgroundColor: 'white',
      borderBottomColor: COLORS.inputBorder,
      borderBottomWidth: 3,
      borderRadius: 5,
      padding: 10,
    },
    imageContainer: {
      height: SCREEN_HEIGHT * 0.25,
      width: SCREEN_WIDTH * 0.5,
      borderRadius: SCREEN_WIDTH * 0.5,
      marginBottom: SCREEN_HEIGHT * 0.015,
      elevation: 5,
      borderColor: 'black',
      borderWidth: 1,
      icon: {
        backgroundColor: COLORS.inputBackground,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.125,
        borderRadius: SCREEN_WIDTH * 0.125,
        position: 'absolute',
        borderWidth: 2,
        top: SCREEN_HEIGHT * 0.175,
        borderColor: COLORS.goDutchBlue,
        left: SCREEN_WIDTH * 0.4,
      },
      image: {},
    },
    inputsScrollContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      nameInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        firstNameInput: { flex: 1, marginRight: 10 },
        lastNameInput: { flex: 1 },
      },
      inputsContainer: { width: SCREEN_WIDTH * 0.9 },
    },
  },

  // ======================================================================================================================================= LOGIN SCREEN
  logInScreen: {
    container: {
      flexDirection: 'column',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      modal: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          backgroundColor: COLORS.goDutchRed,
        },
        inputsContainer: { width: '80%', padding: 20 },
        passwordInput: { flexDirection: 'row', alignItems: 'center', position: 'relative', passwordIcon: { position: 'absolute', right: 10 } },
      },
    },
  },

  // ====================================================================================================================================== SPLIT SCREEN
  splitScreen: {
    container: {
      alignItems: 'center',
      heading: {
        textAlign: 'center',
        marginVertical: 20,
        width: SCREEN_WIDTH * 0.9,
        fontFamily: 'Poppins-Bold',
        fontSize: scaleFont(25),
        color: COLORS.goDutchBlue,
      },
      image: { width: SCREEN_WIDTH * 0.9, resizeMode: 'cover' },
      button: {
        marginTop: 60,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.15,
        width: SCREEN_WIDTH * 0.3,
        borderRadius: '50%',
        borderWidth: 3,
        borderColor: COLORS.goDutchBlue,
      },
    },
  },

  // ====================================================================================================================================== HOME SCREEN
  homeScreen: {
    container: {},
    heading: {
      textAlign: 'center',
      width: SCREEN_WIDTH * 0.9,
      fontFamily: 'Poppins-Regular',
      fontSize: scaleFont(38),
      color: COLORS.goDutchBlue,
    },
    welcomeMessage: {
      textAlign: 'center',
      width: SCREEN_WIDTH * 0.9,
      fontFamily: 'Poppins-Bold',
      fontSize: scaleFont(20),
      color: COLORS.goDutchBlue,
    },
  },
  // ====================================================================================================================================== FAVORITES SCREEN
  favoritesScreen: {
    container: { flexDirection: 'row', justifyContent: 'space-between', marginTop: SCREEN_HEIGHT * 0.05, width: SCREEN_WIDTH * 0.9 },
  },

  // ====================================================================================================================================== PROFILE SCREEN
  profileScreen: {
    scrollViewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      bioContainer: { justifyContent: 'space-between', width: SCREEN_WIDTH * 0.9 },
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      inputLabel: { fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(16), marginTop: 5 },
      textInput: {
        height: 'auto',
        fontFamily: 'Poppins-Regular',
        fontSize: scaleFont(14),
        backgroundColor: 'white',
        borderBottomColor: COLORS.inputBorder,
        borderBottomWidth: 3,
        borderRadius: 5,
        padding: 10,
      },
    },
    buttonContainer: { flexDirection: 'row', width: SCREEN_WIDTH * 0.95, justifyContent: 'space-between' },
  },

  // ====================================================================================================================================== DINING DETAIL SCREEN
  diningDetailsScreen: {
    image: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.45, marginTop: -SCREEN_HEIGHT * 0.025, marginBottom: SCREEN_HEIGHT * 0.04 },
    container: {
      width: SCREEN_WIDTH * 0.9,
      marginBottom: SCREEN_HEIGHT * 0.025,
      heading: { fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(24), color: COLORS.goDutchBlue, marginBottom: SCREEN_HEIGHT * 0.015 },
      label: { fontFamily: 'Poppins-Regular', fontSize: scaleFont(20) },
    },
  },
})
