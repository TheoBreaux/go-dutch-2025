import { useEffect } from 'react'
import { SCREEN_WIDTH } from '../constants/constants'
import { BackHandler, Linking } from 'react-native'

//more balanced cross-platform approach → Use 390px
const baseWidth = 390

export const PRETTIFY = (data) => {
  console.log(JSON.stringify(data, null, 2))
}

export const scaleFont = (fontSize) => (SCREEN_WIDTH / baseWidth) ** (2 / 3) * fontSize

export const useDisableBackButton = () => {
  useEffect(() => {
    const handleBackButton = () => {
      return true // Returning true prevents default behavior (going back)
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButton)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
  }, [])
}

export const handleCallRestaurant = async (number) => {
  try {
    const supported = Linking.canOpenURL(`tel: ${number}`)
    if (supported) {
      await Linking.openURL(`tel: ${number}`)
    } else {
      Alert.alert('Error', 'Your device does not support this feature.')
    }
  } catch (error) {
    console.error('Error opening dialer:', error)
  }
}

export const handleExternalLink = (url) => {
  Linking.openURL(url)
}
