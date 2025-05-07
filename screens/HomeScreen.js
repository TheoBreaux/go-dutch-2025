import { Text, View, TouchableOpacity } from 'react-native'
import Styles from '../style'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Slider from '../components/ui/Slider'
import { ASSET_URL, CIRCLE_SIZE, COLORS } from '../constants/constants'
import { useCallback, useEffect, useState } from 'react'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites, fetchFeaturedRestaurants, setCurrentCity, setLocalRestaurants } from '../state/actions/actions'
import Constants from 'expo-constants'
import { getCityFromCoordinates } from '../utils/utils'
import LocateUser from '../components/LocateUser'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [loadingLocation, setLoadingLocation] = useState(false)

  const user = useSelector((state) => state.app.user)
  const userId = useSelector((state) => state.app.user.userId)
  const currentCity = useSelector((state) => state.app.currentCity)
  const featuredRestaurants = useSelector((state) => state.app.featuredRestaurants)

  const API_KEY = Constants.expoConfig.extra.API_KEY

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0 && !currentCity) {
      handleLocationSearch(latitude, longitude)
    }

    dispatch(fetchFeaturedRestaurants())

    if (userId) {
      dispatch(fetchFavorites(userId))
    }
  }, [latitude, longitude, currentCity, dispatch, userId])

  const handleLocationUpdate = useCallback((lat, long) => {
    setLatitude(lat)
    setLongitude(long)
  }, [])

  const handleLocationSearch = async (lat, long) => {
    setLoadingLocation(true)
    try {
      const { city } = await getCityFromCoordinates(lat, long, API_KEY)
      dispatch(setCurrentCity(city))
      dispatch(setLocalRestaurants({ longitude: long, latitude: lat }))
      setLoadingLocation(false)
    } catch (error) {
      console.error('Failed to get city from coordinates:', error)
    }
  }

  return (
    <>
      <LocateUser onLocationUpdate={handleLocationUpdate} />
      <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
        <View style={Styles.homeScreen.headingContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[Styles.homeScreen.heading, { alignSelf: 'flex-end' }]}>Hi, {user.firstName}!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tabs', { screen: 'Settings' })}>
              <ProfileImageMedallion
                height={CIRCLE_SIZE * 0.15}
                width={CIRCLE_SIZE * 0.15}
                borderRadius={(CIRCLE_SIZE * 0.15) / 2}
                imageUrl={ASSET_URL + user.imgUrl}
              />
            </TouchableOpacity>
          </View>
        </View>

        {loadingLocation ? (
          <Text style={Styles.homeScreen.welcomeMessage}>Locating your city...</Text>
        ) : (
          <Text style={Styles.homeScreen.welcomeMessage}>
            Find restaurants in <Text style={{ fontFamily: 'Poppins-BlackItalic' }}>{currentCity}!</Text>
          </Text>
        )}

        <Slider featuredRestaurants={featuredRestaurants} />
      </LogoScreenWrapper>
    </>
  )
}

export default HomeScreen
