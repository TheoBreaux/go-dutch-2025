import { FlatList, View } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import ScrollPageHeader from '../components/ScrollPageHeader'
import RestaurantTile from '../components/ui/RestaurantTile'
import { COLORS, SCREEN_HEIGHT, API_URL } from '../constants/constants'
import { useEffect, useState } from 'react'
import API from '../state/api'
import Styles from '../style'

const RestaurantsScreen = () => {
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
      <View style={{ marginTop: -SCREEN_HEIGHT * 0.025 }}>
        <ScrollPageHeader>Featured Restaurants</ScrollPageHeader>
      </View>

      <View style={Styles.resturantsScreen.container}>
        <FlatList
          data={featuredRestaurants}
          keyExtractor={(item) => item.restaurantId.toString()}
          renderItem={({ item }) => <RestaurantTile {...item} />}
          contentContainerStyle={{
            paddingBottom: SCREEN_HEIGHT * 0.025,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LogoScreenWrapper>
  )
}

export default RestaurantsScreen
