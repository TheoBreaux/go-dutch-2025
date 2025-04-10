import { Text, View, TouchableOpacity } from 'react-native'
import Styles from '../style'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Slider from '../components/ui/Slider'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import { useEffect } from 'react'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeaturedRestaurants } from '../state/actions/actions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.app.user)
  console.log("I AM USER: ", user)
  const featuredRestaurants = useSelector((state) => state.app.featuredRestaurants)

  useEffect(() => {
    dispatch(fetchFeaturedRestaurants())
  }, [dispatch])

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={Styles.homeScreen.headingContainer}>
        <Text style={Styles.homeScreen.heading}>Welcome, {user.firstName}!</Text>
        <TouchableOpacity onPress={() => {}}>
          <ProfileImageMedallion
            height={SCREEN_HEIGHT * 0.07}
            width={SCREEN_WIDTH * 0.15}
            borderRadius={(SCREEN_WIDTH * 0.15) / 2}
            image={user.imgUrl}
          />
        </TouchableOpacity>
      </View>

      <Text style={Styles.homeScreen.welcomeMessage}>Find restaurants near {user.location}!</Text>
      <Slider featuredRestaurants={featuredRestaurants} />
    </LogoScreenWrapper>
  )
}

export default HomeScreen
