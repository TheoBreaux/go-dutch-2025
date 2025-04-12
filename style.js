import { Platform, StyleSheet } from 'react-native'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/constants'
import { scaleFont } from './utils/utils'
import ReceiptAnalyzingScreen from './screens/ReceiptAnalyzingScreen'

const containerWidth = SCREEN_WIDTH * 0.9 // 90% of screen width
const containerHeight = SCREEN_HEIGHT * 0.1 // 10% of screen height
const containerBorderRadius = scaleFont(15)

// console.log(SCREEN_WIDTH)

// HEIGHT 836
// WIDTH 411

export default StyleSheet.create({
  // ================================================================================================================================== FAVORITES ICON
  favoritesIcon: { backgroundColor: COLORS.favoritesIconBackground, padding: 5, borderRadius: 30 },
  // ================================================================================================================================== RESTAURANTS SCREEN
  resturantsScreen: {
    container: { flex: 1, marginBottom: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.125 : SCREEN_HEIGHT * 0.08 },
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
      marginTop: 10,
      marginBottom: SCREEN_HEIGHT * 0.0025,
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
          borderRadius: '50%',
          width: SCREEN_WIDTH * 0.13,
          height: SCREEN_HEIGHT * 0.065,
          position: 'absolute',
        },
        inner: {
          borderWidth: 1,
          borderColor: COLORS.goDutchRed,
          borderRadius: '50%',
          backgroundColor: COLORS.goDutchRed,
          width: SCREEN_WIDTH * 0.1,
          height: SCREEN_HEIGHT * 0.05,
          alignItems: 'center',
          justifyContent: 'center',
          text: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(14), color: 'white' },
        },
      },
    },
  },

  // ========================================================================================================================================= PROFILE IMAGE MEDALLION
  profileImageMedallion: {
    container: {
      elevation: 5,
      borderRadius: 10,
      marginRight: SCREEN_WIDTH * 0.025,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      image: { resizeMode: 'cover' },
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

  // ================================================================================================================================== CUSTOM MODAL CONTAINER
  customModalContainer: {
    overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.7, borderRadius: 10, overflow: 'hidden' },
    imageBackground: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buttonsContainer: { flexDirection: 'row', width: SCREEN_WIDTH * 0.9, alignItems: 'center', justifyContent: 'center' },
    text: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(16) },
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
      header: { backgroundColor: '#00000066', height: SCREEN_HEIGHT * 0.1, width: SCREEN_WIDTH, alignItems: 'center' },
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
      height: SCREEN_HEIGHT * 0.15,
      width: SCREEN_WIDTH * 0.3,
      borderRadius: (SCREEN_WIDTH * 0.3) / 2,
      borderWidth: 3,
      borderColor: COLORS.goDutchBlue,
    },
    capturedImageContainer: {
      width: SCREEN_WIDTH * 0.95,
      height: SCREEN_HEIGHT,
      borderWidth: 2,
      borderColor: COLORS.goDutchRed,
      buttonContainer: {
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.15,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: SCREEN_WIDTH * 0.95,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_WIDTH * 0.05,
        iconContainer: {
          width: SCREEN_WIDTH * 0.25,
          height: SCREEN_HEIGHT * 0.125,
          borderRadius: (SCREEN_WIDTH * 0.25) / 2,
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
      header: { color: COLORS.goDutchBlue, fontSizre: scaleFont(34), fontFamily: 'Poppins-Regular' },
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
        height: SCREEN_HEIGHT * 0.06,
        width: SCREEN_WIDTH * 0.125,
        borderRadius: SCREEN_WIDTH * 0.125,
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
    image: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.4, marginTop: -SCREEN_HEIGHT * 0.025, marginBottom: SCREEN_HEIGHT * 0.04 },
    container: {
      width: SCREEN_WIDTH * 0.9,
      marginBottom: SCREEN_HEIGHT < 830 ? SCREEN_HEIGHT * 0.05 : SCREEN_HEIGHT * 0.025,
      heading: { fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(24), color: COLORS.goDutchBlue, marginBottom: SCREEN_HEIGHT * 0.015 },
      label: { fontFamily: 'Poppins-Regular', fontSize: scaleFont(20) },
    },
  },

  // ====================================================================================================================================== DINER INPUT SCREEN
  dinerInputScreen: {
    text: {
      event: { fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(30), color: COLORS.goDutchRed, marginBottom: -SCREEN_HEIGHT * 0.015 },
      location: { fontFamily: 'Poppins-Bold', fontSize: scaleFont(24), color: COLORS.goDutchBlue },
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: COLORS.goDutchRed,
      borderRadius: 10,
      width: SCREEN_WIDTH * 0.9,
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      input: { padding: SCREEN_WIDTH * 0.04, height: SCREEN_HEIGHT * 0.055 },
      search: { borderLeftWidth: 1, borderLeftColor: COLORS.goDutchRed, width: 40, justifyContent: 'center', alignItems: 'center' },
    },
  },
  // ====================================================================================================================================== ITEM CONFIRMATION SCREEN
  itemConfirmationScreen: {
    modalContainer: {
      marginTop: 20,
      padding: 10,
      borderRadius: 10,
      width: SCREEN_WIDTH * 0.9,
      height: SCREEN_HEIGHT * 0.2,
      backgroundColor: 'white',
      elevation: 5,
      alignItems: 'center',
      text: { fontFamily: 'Poppins-Medium', fontSize: scaleFont(30), color: COLORS.goDutchRed },
      buttonContainer: { flexDirection: 'row', width: SCREEN_WIDTH * 0.9, justifyContent: 'center' },
      subtotal: { fontFamily: 'Poppins-Medium', fontSize: scaleFont(30), color: 'black', marginTop: 20 },
    },
  },
  // ====================================================================================================================================== DINER ITEM ASSIGNMENT SCREEN
  dinerItemAssignmentScreen: {
    container: {
      marginTop: 5,
      alignItems: 'center',
      text: {
        fontFamily: 'Poppins-Bold',
        fontSize: scaleFont(30),
        color: COLORS.goDutchRed,
        marginBottom: -10,
        instruction: { fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(20), color: 'black', marginBottom: 5 },
      },
    },
    userName: { fontFamily: 'Poppins-SemiBold', fontSize: scaleFont(20), color: COLORS.goDutchRed, marginTop: 5 },
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
