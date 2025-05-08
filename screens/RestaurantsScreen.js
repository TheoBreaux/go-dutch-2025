import { FlatList, View } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import ScrollPageHeader from '../components/ScrollPageHeader'
import RestaurantTile from '../components/ui/RestaurantTile'
import { COLORS, SCREEN_HEIGHT, API_URL } from '../constants/constants'
import { useEffect, useState } from 'react'
import Styles from '../style'

const RestaurantsScreen = () => {
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
      <View style={{ marginTop: -SCREEN_HEIGHT * 0.025 }}>
        <ScrollPageHeader>Featured Restaurants</ScrollPageHeader>
      </View>

      <View style={Styles.resturantsScreen.container}>
        <FlatList
          data={featuredRestaurants}
          keyExtractor={(item) => item.restaurantId.toString()}
          renderItem={({ item }) => <RestaurantTile item={item} />}
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
