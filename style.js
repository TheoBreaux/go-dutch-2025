import { Platform, StyleSheet } from 'react-native'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, CIRCLE_SIZE } from './constants/constants'
import { scaleFont } from './utils/utils'

const containerWidth = SCREEN_WIDTH * 0.9 // 90% of screen width
const containerHeight = SCREEN_HEIGHT * 0.1 // 10% of screen height
const containerBorderRadius = scaleFont(15)

// console.log(SCREEN_WIDTH)
// console.log(SCREEN_HEIGHT)

// HEIGHT 836
// WIDTH 411

export default StyleSheet.create({
  // ================================================================================================================================== FAVORITES ICON
  favoritesIcon: { backgroundColor: COLORS.favoritesIconBackground, padding: 5, borderRadius: 30 },
  // ================================================================================================================================== RESTAURANTS SCREEN
  resturantsScreen: {
    container: { flex: 1, marginBottom: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.125 : SCREEN_HEIGHT * 0.08 },
  },

  // ================================================================================================================================== CONFIRMABLE DINNER ITEM TILE
  confirmableDinnerItemTile: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      borderRadius: 10,
      backgroundColor: COLORS.goDutchRed,
      marginBottom: 2,
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.07,
      // elevation: 5,
      // shadowColor: 'black',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.2,
      // shadowRadius: 4,
      text: { fontFamily: 'Poppins-ExtraBold', color: 'white', fontSize: SCREEN_WIDTH < 400 ? scaleFont(14) : scaleFont(18) },
    },
  },
  // ================================================================================================================================== DINNER ITEM
  dinnerItem: {
    animatedContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      marginVertical: 2,
      borderRadius: 10,
      width: SCREEN_WIDTH * 0.95,
      height: SCREEN_HEIGHT * 0.05,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      borderRadius: 10,
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.05,
      switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white',
        text: { fontFamily: 'Poppins-Bold', color: 'white', fontSize: SCREEN_WIDTH < 400 ? scaleFont(12) : scaleFont(14) },
      },
      text: {
        name: { fontFamily: 'Poppins-Medium', color: 'white', fontSize: SCREEN_WIDTH < 400 ? scaleFont(12) : scaleFont(16) },
        price: { fontFamily: 'Poppins-ExtraBold', color: 'white', fontSize: SCREEN_WIDTH < 400 ? scaleFont(14) : scaleFont(16) },
      },
      handOverlay: {
        position: 'relative',
        zIndex: 999,
        hand: { position: 'absolute', width: SCREEN_WIDTH * 0.12, height: SCREEN_HEIGHT * 0.12, resizeMode: 'cover' },
      },
    },
  },

  // ================================================================================================================================== CELEBRATED DINER SWITCH
  celebratedDinerSwitch: {
    container: {
      width: SCREEN_WIDTH * 0.75,
      borderRadius: 5,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      backgroundColor: 'white',
      text: {
        name: { fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(16) },
        username: { fontFamily: 'Poppins-Regular', fontSize: scaleFont(14), color: COLORS.goDutchBlue },
      },
      switch: {
        flexDirection: 'row',
        alignItems: 'center',
        text: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(16) },
      },
    },
  },

  // ================================================================================================================================== RESTAURANT TILE
  restaurantTile: {
    container: {
      info: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
      padding: 10,
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.15,
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      backgroundColor: 'white',
      borderRadius: 20,
      marginTop: 10,
      flexDirection: 'row',
      imageContainer: { borderRadius: 20, overflow: 'hidden', marginRight: 10, image: { width: 100, height: '100%', resizeMode: 'contain' } },
      textContainer: {
        width: '50%',
        marginRight: 10,
        text: { name: { fontFamily: 'Poppins-Bold', fontSize: SCREEN_WIDTH < 400 ? scaleFont(14) : scaleFont(15) } },
        info: { fontFamily: 'Poppins-Regular', fontSize: SCREEN_WIDTH < 400 ? scaleFont(12) : scaleFont(14), marginBottom: -5 },
      },
    },
  },

  // ========================================================================================================================================= TAB BAR
  tabBar: {
    tabBarStyle: { backgroundColor: COLORS.goDutchBlue, height: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.09 : SCREEN_HEIGHT * 0.08 },
    tabBarLabelStyle: { color: 'white', marginTop: 5, fontFamily: 'Poppins-SemiBold', fontSize: SCREEN_WIDTH < 400 ? scaleFont(10) : scaleFont(12) },
    tabBarItemStyle: { height: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.1 : SCREEN_HEIGHT * 0.08 },
  },
  // ========================================================================================================================================= DINER TILE
  dinerTile: {
    container: {
      backgroundColor: 'white',
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      borderRadius: 20,
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.1,
      marginTop: SCREEN_HEIGHT * 0.0025,
      marginBottom: SCREEN_HEIGHT * 0.004,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SCREEN_WIDTH * 0.035,
      closeButtonContainer: {
        text: {
          primary: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(18), color: COLORS.goDutchRed, marginBottom: -5 },
          name: { fontFamily: 'Poppins-Regular', fontSize: scaleFont(14), marginBottom: -5 },
        },
        alignItems: 'center',
        justifyContent: 'center',
        outter: {
          borderWidth: 3,
          borderColor: COLORS.goDutchBlue,
          borderRadius: CIRCLE_SIZE / 2,
          width: CIRCLE_SIZE * 0.125,
          height: CIRCLE_SIZE * 0.125,
          position: 'absolute',
        },
        inner: {
          borderWidth: 1,
          borderColor: COLORS.goDutchRed,
          borderRadius: CIRCLE_SIZE / 2,
          backgroundColor: COLORS.goDutchRed,
          width: CIRCLE_SIZE * 0.1,
          height: CIRCLE_SIZE * 0.1,
          alignItems: 'center',
          justifyContent: 'center',
          text: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(14), color: 'white' },
        },
      },
    },
  },
  // ========================================================================================================================================= SUGGESTION ITEM
  suggestionItem: {
    container: {
      backgroundColor: 'white',
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.07,
      marginTop: 5,
      marginBottom: SCREEN_HEIGHT * 0.0025,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SCREEN_WIDTH * 0.035,
      text: {
        username: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(18), color: COLORS.goDutchBlue, marginBottom: -5 },
        name: { fontFamily: 'Poppins-Medium', fontSize: scaleFont(14), color: COLORS.goDutchBlue, marginBottom: -5 },
      },
    },
  },

  // ========================================================================================================================================= PROFILE IMAGE MEDALLION
  profileImageMedallion: {
    container: {
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      borderRadius: 10,
      marginRight: SCREEN_WIDTH * 0.025,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // or undefined
    },
    image: {
      resizeMode: 'cover',
    },
  },

  // ============================================================================================================================================ SCROLL PAGE HEADER
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
      text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SCREEN_WIDTH < 400 ? scaleFont(25) : scaleFont(30),
        color: COLORS.goDutchRed,
        letterSpacing: 1,
      },
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
      text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SCREEN_WIDTH < 400 ? scaleFont(20) : scaleFont(24),
        color: COLORS.goDutchRed,
        letterSpacing: 1,
      },
    },
  },

  // ================================================================================================================================== PRIMARY BUTTON
  primaryButton: {
    outerContainer: {
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

  // ================================================================================================================================== EDIT PROFILE IMAGE HEADER
  editProfileImageHeader: {
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      modalContent: {
        backgroundColor: 'white',
        padding: SCREEN_WIDTH * 0.05,
        borderRadius: 10,
        height: SCREEN_HEIGHT * 0.25,
        width: SCREEN_WIDTH * 0.9,
        text: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(30), textAlign: 'center', marginBottom: SCREEN_HEIGHT * 0.015 },
        optionsContainer: { alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' },
        modalIconContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(162, 164, 167, 0.563)',
          padding: 10,
          width: SCREEN_WIDTH * 0.225,
          borderRadius: 10,
          text: { fontFamily: 'Poppins-Medium', fontSize: scaleFont(14) },
        },
      },
    },
  },
  // ================================================================================================================================== ADD DINNER ITEM MODAL
  addDinnerItemModal: {
    container: {
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.45,
      borderRadius: 10,
      overflow: 'hidden',
      header: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(20) },
      inputsContainer: {
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.9,
        label: {
          fontFamily: 'Poppins-Medium',
          fontSize: scaleFont(20),
        },
        input: {
          width: SCREEN_WIDTH * 0.75,
          height: SCREEN_HEIGHT * 0.06,
          borderColor: COLORS.inputBorder,
          borderWidth: 1,
          marginBottom: 5,
          padding: 5,
          textAlign: 'center',
          fontFamily: 'Poppins-Medium',
          fontSize: 25,
        },
      },
    },
  },

  // ================================================================================================================================== CUSTOM MODAL CONTAINER
  customModalContainer: {
    overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: SCREEN_WIDTH * 0.9, borderRadius: 10, overflow: 'hidden' },
    imageBackground: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buttonsContainer: { flexDirection: 'row', width: SCREEN_WIDTH * 0.9, alignItems: 'center', justifyContent: 'center' },
    text: { fontFamily: 'Poppins-ExtraBold', fontSize: scaleFont(20) },
  },

  // ================================================================================================================================== CELEBRATION MODAL
  celebrationModal: {
    content: { width: SCREEN_WIDTH * 0.7, height: SCREEN_HEIGHT * 0.4, borderRadius: 10, overflow: 'hidden', marginBottom: SCREEN_HEIGHT * 0.025 },
    image: { width: '100%', height: '100%' },
  },

  // ====================================================================================================================================== RECEIPT CAPTURE SCREEN
  receiptCaptureScreen: {
    cameraView: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      alignItems: 'center',
      header: { backgroundColor: '#00000066', width: SCREEN_WIDTH, alignItems: 'center' },
      iconsContainer: { flexDirection: 'row', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.85 },
      panel: { width: SCREEN_WIDTH * 0.025, backgroundColor: '#00000066', height: SCREEN_HEIGHT },
    },
    captureArea: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingHorizontal: SCREEN_WIDTH * 0.05,
      container: { flexDirection: 'row', justifyContent: 'space-between' },
    },
    button: {
      marginTop: SCREEN_HEIGHT * 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      height: CIRCLE_SIZE * 0.25,
      width: CIRCLE_SIZE * 0.25,
      borderRadius: CIRCLE_SIZE / 2,
      borderWidth: 3,
      borderColor: COLORS.goDutchBlue,
    },
    capturedImageContainer: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      buttonContainer: {
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.1,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_WIDTH * 0.15,
        iconContainer: {
          width: CIRCLE_SIZE * 0.2,
          height: CIRCLE_SIZE * 0.2,
          borderRadius: CIRCLE_SIZE / 2,
          borderColor: COLORS.goDutchBlue,
          borderWidth: 3,
          backgroundColor: '#00000066',
          alignItems: 'center',
          justifyContent: 'center',
          text: { marginTop: 5, fontFamily: 'Poppins-Bold', color: 'white' },
        },
      },
    },
  },
  // ====================================================================================================================================== RECEIPT ANALYZING SCREEN
  receiptAnalyzingScreen: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      image: { width: SCREEN_WIDTH * 0.6, height: SCREEN_HEIGHT * 0.325, resizeMode: 'contain', marginBottom: 10 },
      text: { fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(30), color: COLORS.goDutchRed },
    },
  },

  // ================================================================================================================================== DINER ITEM REVIEW MODAL
  dinerItemReviewModal: {
    content: { alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH * 0.9 },
    text: {
      header: { color: COLORS.goDutchBlue, fontSize: scaleFont(34), fontFamily: 'Poppins-ExtraBold' },
      username: { color: COLORS.goDutchBlue, fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(25) },
      instructions: { fontSize: scaleFont(16), fontFamily: 'Poppins-Medium', textAlign: 'center', color: COLORS.goDutchBlue },
    },
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
      top: SCREEN_HEIGHT * 0.05,
      left: 0,
      width: '100%',
      height: SCREEN_HEIGHT,
      zIndex: 1,
      flex: 1,
      alignItems: 'center',
      paddingTop: 20,
      imageBackgroundStyle: { resizeMode: 'repeat', width: '100%' },
      logo: { resizeMode: 'contain', width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.1 },
    },
  },

  // ====================================================================================================================================== WELCOME SCREEN
  welcomeScreen: {
    header: { fontFamily: 'Poppins-ExtraBold', fontSize: scaleFont(25), marginTop: SCREEN_HEIGHT * 0.05, textAlign: 'center' },
    icon: {
      marginTop: SCREEN_HEIGHT * 0.015,
      width: SCREEN_WIDTH * 0.5,
      height: SCREEN_HEIGHT * 0.25,
      resizeMode: 'contain',
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
      icon: {
        backgroundColor: COLORS.inputBackground,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: CIRCLE_SIZE * 0.125,
        width: CIRCLE_SIZE * 0.125,
        borderRadius: (CIRCLE_SIZE * 0.125) / 2,
        position: 'absolute',
        borderWidth: 2,
        top: SCREEN_HEIGHT * 0.3,
        borderColor: COLORS.goDutchBlue,
        left: SCREEN_WIDTH * 0.6,
      },
    },
    formContainer: { alignItems: 'center', width: SCREEN_WIDTH * 0.9 },
    inputsScrollContainer: {
      marginTop: SCREEN_HEIGHT * 0.025,
      justifyContent: 'center',
      nameInputsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        firstNameInput: { width: '48%', marginRight: 10 },
        lastNameInput: { width: '48%' },
      },
      inputsContainer: { width: SCREEN_WIDTH * 0.9 },
    },
  },

  // ======================================================================================================================================= LOGIN SCREEN
  logInScreen: {
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      logo: {
        marginTop: SCREEN_HEIGHT * 0.015,
        width: SCREEN_WIDTH * 0.5,
        height: SCREEN_HEIGHT * 0.25,
        resizeMode: 'contain',
        marginTop: SCREEN_HEIGHT * 0.125,
      },
      modal: {
        inputsContainer: { width: SCREEN_WIDTH * 0.9, marginBottom: SCREEN_HEIGHT * 0.02 },
        passwordInput: {
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
          passwordIcon: { position: 'absolute', right: 10 },
        },
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
        fontSize: SCREEN_WIDTH < 400 ? scaleFont(20) : scaleFont(25),
        color: COLORS.goDutchBlue,
      },
      image: { width: SCREEN_WIDTH * 0.9, resizeMode: 'cover' },
    },
  },

  // ====================================================================================================================================== HOME SCREEN
  homeScreen: {
    headingContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH * 0.9 },
    heading: {
      textAlign: 'center',
      marginRight: 10,
      fontFamily: 'Poppins-BlackItalic',
      fontSize: SCREEN_WIDTH < 400 ? scaleFont(30) : scaleFont(32),
      color: COLORS.goDutchBlue,
    },
    welcomeMessage: {
      textAlign: 'center',
      width: SCREEN_WIDTH * 0.9,
      fontFamily: 'Poppins-Bold',
      fontSize: SCREEN_WIDTH < 400 ? scaleFont(18) : scaleFont(20),
      color: COLORS.goDutchBlue,
    },
    sliderItem: {
      container: {
        alignItems: 'center',
        width: 'auto',
        carouselContainer: {
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 20,
          overflow: 'hidden',
          image: { width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.4, resizeMode: 'cover' },
          favoritesIconContainer: { alignItems: 'flex-end', position: 'absolute', right: 10, top: 10 },
        },
        restaurantInfoContainer: {
          alignItems: 'center',
          text: {
            name: {
              fontFamily: 'Poppins-Bold',
              fontSize: SCREEN_WIDTH < 400 ? scaleFont(20) : scaleFont(25),
              marginBottom: -10,
              textAlign: 'center',
            },
            address: { fontFamily: 'Poppins-Regular', fontSize: scaleFont(18), marginBottom: -5 },
          },
        },
      },
    },
  },
  // ====================================================================================================================================== FAVORITES SCREEN
  favoritesScreen: {
    container: { flexDirection: 'row', justifyContent: 'space-between', marginTop: SCREEN_HEIGHT * 0.025, width: SCREEN_WIDTH * 0.9 },
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
    image: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.4, marginTop: -SCREEN_HEIGHT * 0.025, marginBottom: SCREEN_HEIGHT * 0.01 },
    container: {
      width: SCREEN_WIDTH * 0.9,
      marginBottom: SCREEN_HEIGHT < 830 ? SCREEN_HEIGHT * 0.05 : SCREEN_HEIGHT * 0.025,
      heading: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(26), color: COLORS.goDutchBlue },
      label: { fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(20) },
      inputContainer: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        closeIcon: { position: 'absolute', right: SCREEN_WIDTH * 0.025 },
      },
      picker: {
        height: 'auto',
        backgroundColor: 'white',
        borderBottomColor: COLORS.inputBorder,
        borderBottomWidth: Platform.OS === 'ios' ? null : 3,
        borderRadius: 5,
        width: '100%',
      },
    },
  },

  // ====================================================================================================================================== DINER INPUT SCREEN
  dinerInputScreen: {
    container: { alignItems: 'center', marginBottom: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.1 : SCREEN_HEIGHT * 0.04, flex: 1 },
    text: {
      event: {
        fontFamily: 'Poppins-BlackItalic',
        fontSize: scaleFont(30),
        color: COLORS.goDutchRed,
        marginBottom: -SCREEN_HEIGHT * 0.015,
        marginTop: -SCREEN_HEIGHT * 0.005,
        letterSpacing: 1,
      },
      location: { fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(24), color: COLORS.goDutchBlue, letterSpacing: 1 },
    },
    inputContainer: {
      position: 'relative',
      alignItems: 'center',
      borderRadius: 10,
      width: SCREEN_WIDTH * 0.9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      marginBottom: SCREEN_HEIGHT * 0.01,
      input: {
        fontFamily: 'Poppins-Regular',
        fontSize: scaleFont(16),
        backgroundColor: 'white',
        borderBottomColor: COLORS.inputBorder,
        borderBottomWidth: 3,
        padding: 10,
        height: 'auto',
        width: SCREEN_WIDTH,
      },
      search: { width: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10 },
    },
    miniModal: {
      text: { fontFamily: 'Poppins-ExtraBold', fontSize: scaleFont(25) },
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.2,
      borderWidth: 1,
      borderColor: COLORS.goDutchBlue,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  // ====================================================================================================================================== ITEM CONFIRMATION SCREEN
  itemConfirmationScreen: {
    modalContainer: {
      marginTop: SCREEN_HEIGHT * 0.02,
      borderRadius: 10,
      width: SCREEN_WIDTH * 0.9,
      height: 'auto',
      backgroundColor: 'white',
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      alignItems: 'center',
      text: {
        name: {
          fontFamily: 'Poppins-BlackItalic',
          fontSize: SCREEN_HEIGHT < 400 ? scaleFont(20) : scaleFont(30),
          color: COLORS.goDutchRed,
          marginBottom: -5,
        },
        confirm: {
          fontFamily: 'Poppins-Medium',
          fontSize: SCREEN_WIDTH < 400 ? scaleFont(18) : scaleFont(20),
          color: 'black',
          marginBottom: 10,
          textAlign: 'center',
        },
        subtotal: { fontFamily: 'Poppins-ExtraBold', fontSize: scaleFont(30), color: 'black', marginTop: SCREEN_HEIGHT * 0.025 },
      },
      buttonContainer: { flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'space-evenly' },
    },
  },
  // ====================================================================================================================================== DINER ITEM ASSIGNMENT SCREEN
  dinnerItemAssignmentScreen: {
    container: {
      alignItems: 'center',
      text: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: SCREEN_WIDTH < 400 ? scaleFont(20) : scaleFont(25),
        color: COLORS.goDutchRed,
        marginBottom: -SCREEN_HEIGHT * 0.005,
        instruction: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: SCREEN_WIDTH < 400 ? scaleFont(16) : scaleFont(18),
          color: 'black',
          marginBottom: 5,
          textAlign: 'center',
        },
      },
      userName: { fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(20), color: COLORS.goDutchRed, marginTop: 5 },
    },
  },
  // ====================================================================================================================================== RESTAURANT DETAILS SCREEN
  restaurantDetailsScreen: {
    backButton: {
      zIndex: 200,
      position: 'absolute',
      left: SCREEN_WIDTH * 0.05,
      backgroundColor: COLORS.goDutchBlue,
      width: SCREEN_WIDTH * 0.1,
      height: SCREEN_HEIGHT * 0.05,
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    favoritesIconContainer: { position: 'absolute', right: SCREEN_WIDTH * 0.05 },
    goDutchIcon: {
      width: SCREEN_WIDTH * 0.25,
      height: SCREEN_HEIGHT * 0.125,
      borderRadius: '50%',
      borderColor: COLORS.logoScreenBackground,
      borderWidth: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: SCREEN_HEIGHT * 0.31,
      left: SCREEN_WIDTH * 0.05,
      image: { width: SCREEN_WIDTH * 0.2, height: SCREEN_HEIGHT * 0.1, resizeMode: 'contain' },
    },
    rating: { position: 'absolute', top: SCREEN_HEIGHT * 0.37, left: SCREEN_WIDTH * 0.3 },
    restaurantInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      text: {
        name: { fontFamily: 'Poppins-ExtraBold', fontSize: scaleFont(25), marginTop: 5, marginBottom: -SCREEN_HEIGHT * 0.005 },
        address: { fontFamily: 'Poppins-Medium', fontSize: scaleFont(15) },
      },
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: SCREEN_WIDTH * 0.9,
      justifyContent: 'space-between',
      marginTop: -5,
      marginLeft: -SCREEN_WIDTH * 0.025,
    },
    bio: { fontFamily: 'Poppins-Medium', fontSize: scaleFont(14), textAlign: 'justify' },
    notesContainer: {
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.125,
      borderWidth: 1,
      borderColor: COLORS.inputBorder,
      backgroundColor: COLORS.inputBackground,
      borderRadius: 10,
      padding: 10,
      fontFamily: 'Poppins-Regular',
      fontSize: scaleFont(14),
      marginTop: 5,
    },
  },

  // ====================================================================================================================================== CONFIRM TOTAL SCREEN
  confirmTotalsScreen: {
    container: {
      height: SCREEN_HEIGHT * 0.75,
      width: SCREEN_WIDTH * 0.9,
      backgroundColor: 'white',
      elevation: 5,
      marginTop: SCREEN_HEIGHT * 0.025,
      alignItems: 'center',
      text: { restaurantName: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(30), color: COLORS.goDutchRed, marginTop: SCREEN_HEIGHT * 0.025 } },
      inputContainer: {
        width: SCREEN_WIDTH * 0.8,
        flexDirection: 'row',
        textInput: {
          fontFamily: 'Poppins-Regular',
          fontSize: scaleFont(18),
          backgroundColor: 'white',
          borderBottomColor: COLORS.inputBorder,
          borderBottomWidth: 3,
          borderRadius: 5,
          padding: 10,
          marginRight: SCREEN_WIDTH * 0.05,
          width: SCREEN_WIDTH * 0.65,
          label: { fontFamily: 'Poppins-Medium', fontSize: scaleFont(20) },
        },
      },
      tipButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: SCREEN_WIDTH * 0.9,
        tipButton: { marginRight: SCREEN_WIDTH * 0.075, alignItems: 'center' },
        tipButtonLabel: {
          marginTop: SCREEN_HEIGHT * 0.015,
          fontFamily: 'Poppins-Bold',
          fontSize: scaleFont(16),
          marginBottom: SCREEN_HEIGHT * 0.075,
        },
      },
    },
  },
})
