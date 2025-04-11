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

export const getCityFromCoordinates = async (latitude, longitude, apiKey) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`

  console.log('Fetching city for:', latitude, longitude)

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    console.log('Geocoding API response:', data)

    // Check if results are empty
    if (data.results.length === 0) {
      return { city: null, error: 'No address found for the given coordinates.' }
    }

    const addressComponents = data.results.length > 0 ? data.results[0].address_components : []

    // Find the city in the address components
    const cityComponent = addressComponents.find(
      (component) => component.types.includes('locality') || component.types.includes('administrative_area_level_2')
    )

    const city = cityComponent ? cityComponent.long_name : 'City not found'
    return { city }
  } catch (error) {
    console.error('Error fetching city:', error)
    //find a better way to handle this
    return {
      city: null,
      error: 'Unable to retrieve current location',
    }
  }
}
