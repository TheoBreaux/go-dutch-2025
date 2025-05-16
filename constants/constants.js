import { Dimensions } from 'react-native'

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
export const CIRCLE_SIZE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT)

export const COLORS = {
  goDutchRed: '#a40e24',
  goDutchBlue: '#273f81',
  inputBackground: '#e8ebf0',
  inputBorder: '#1a202c',
  logoScreenBackground: '#E9F0FAF2',
  favoritesIconBackground: '#0000004D',
}

// export const API_URL = 'http://192.168.1.198:8000'
export const API_URL = 'https://877d-2603-8000-c000-4fc2-8df9-4c44-96e8-89ba.ngrok-free.app' //ngrok - app preview testing
export const ASSET_URL = 'https://go-dutch-bucket.s3.us-west-1.amazonaws.com/'
