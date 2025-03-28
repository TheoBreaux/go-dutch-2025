import { Dimensions } from 'react-native'

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export const COLORS = {
  goDutchRed: '#a40e24',
  goDutchBlue: '#273f81',
  inputBackground: '#e8ebf0',
  inputBorder: '#1a202c',
  logoScreenBackground: '#E9F0FAF2',
}

export const API_URL = 'http://mobileartslab.com:8000/api'
export const ASSET_URL = 'http://mobileartslab.com:8000/assets/'
