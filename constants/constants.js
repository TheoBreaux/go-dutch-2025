import { Dimensions } from 'react-native'

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export const COLORS = {
  goDutchRed: '#a40e24',
  goDutchBlue: '#273f81',
  inputBackground: '#e8ebf0',
  inputBorder: '#1a202c',
  logoScreenBackground: '#E9F0FAF2',
  favoritesIconBackground: '#0000004D',
}

export const API_URL = 'http://192.168.1.198:8000'
export const ASSET_URL = 'https://go-dutch-bucket.s3.us-west-1.amazonaws.com/'
