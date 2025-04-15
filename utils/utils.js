import { useEffect } from 'react'
import { SCREEN_WIDTH } from '../constants/constants'
import { BackHandler, Linking } from 'react-native'
import Constants from 'expo-constants'
import * as FileSystem from 'expo-file-system'

const VERYFI_CLIENT_ID = Constants.expoConfig.extra.VERYFI_CLIENT_ID
const VERYFI_ID = Constants.expoConfig.extra.VERYFI_ID

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

export const handleReceiptParse = async (imageUri) => {
  const url = 'https://api.veryfi.com/api/v8/partner/documents/'

  // Convert image file to base64 string
  const base64Image = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  })

  const payload = {
    file_data: base64Image,
    boost_mode: true,
    external_id: 'optional_custom_id',
    tags: ['godutch'],
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CLIENT-ID': VERYFI_CLIENT_ID,
        AUTHORIZATION: VERYFI_ID,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    return data
  } catch (err) {
    console.error('Upload failed:', err)
  }
}

export const formatReceiptDate = (rawDateStr) => {
  try {
    // Extract just the date part (first 10 characters)
    const datePart = rawDateStr.slice(0, 10) // '2024-07-15'

    const [year, month, day] = datePart.split('-')
    return `${month}-${day}-${year.slice(2)}`
  } catch (err) {
    console.warn('Invalid date format:', rawDateStr)
    return ''
  }
}





export  const checkIfDinerExistsInDatabase = async (username) => {
  let isDinerInDatabase;
  try {
    const response = await fetch(
      `https://5574-76-32-124-165.ngrok-free.app/users/${username}`
    );
    const data = await response.json();
    isDinerInDatabase = data;
    return data;
  } catch (error) {
    console.error("User does not exist in database", error);
    return false;
  }
};

export const autoCompleteDiner = async () => {
  try {
    const response = await fetch(
      `https://5574-76-32-124-165.ngrok-free.app/additionaldiners/suggestions?input=${inputValue}`
    );
    const data = await response.json();
    setSuggestions(
      data.sort((a, b) => a.username.localeCompare(b.username))
    );
  } catch (error) {
    throw error;
  }
};
