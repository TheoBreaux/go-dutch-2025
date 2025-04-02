import { View, Text } from 'react-native'
import Style from '../style'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Slider from '../components/ui/Slider'
import { API_URL, COLORS } from '../constants/constants'
import { useEffect, useState } from 'react'
import API from '../state/api'

const HomeScreen = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const data = await API('GET', `${API_URL}/featuredRestaurants`)
      setFeaturedRestaurants(data)
    } catch (error) {
      setError('Failed to fetch data')
      console.error('Axios Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View>
        <Text style={Style.homeScreen.heading}>Welcome, Theo!</Text>
        <Text style={Style.homeScreen.welcomeMessage}>Find restaurants near you!</Text>
      </View>

      <Slider featuredRestaurants={featuredRestaurants} />
    </LogoScreenWrapper>
  )
}

export default HomeScreen
