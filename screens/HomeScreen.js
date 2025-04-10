import { Text, View, TouchableOpacity } from 'react-native'
import Styles from '../style'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Slider from '../components/ui/Slider'
import { API_URL, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import { useEffect, useState } from 'react'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeaturedRestaurants } from '../state/actions/actions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  // const { featuredRestaurants, loading, error } = useSelector((state) => state.app)

  const [featuredRestaurants, setFeaturedRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    dispatch(fetchFeaturedRestaurants())
  }, [dispatch])

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
