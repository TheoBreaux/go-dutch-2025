import { Text, View, TouchableOpacity } from 'react-native'
import Styles from '../style'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Slider from '../components/ui/Slider'
import { API_URL, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import { useEffect, useState } from 'react'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'

const HomeScreen = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/featuredRestaurants`, { method: 'GET' })
      const data = await response.json()
      setFeaturedRestaurants(data)
    } catch (error) {
      setError('Failed to fetch data')
      console.error('Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={Styles.homeScreen.headingContainer}>
        <Text style={Styles.homeScreen.heading}>Welcome, NAME!</Text>
        <TouchableOpacity onPress={() => {}}>
          <ProfileImageMedallion
            height={SCREEN_HEIGHT * 0.07}
            width={SCREEN_WIDTH * 0.15}
            borderRadius={(SCREEN_WIDTH * 0.15) / 2}
          />
        </TouchableOpacity>
      </View>

      <Text style={Styles.homeScreen.welcomeMessage}>Find restaurants near TOWN!</Text>
      <Slider featuredRestaurants={featuredRestaurants} />
    </LogoScreenWrapper>
  )
}

export default HomeScreen
