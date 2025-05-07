import { FlatList, View } from 'react-native'
import { useEffect, useState } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import FavoritesButton from '../components/ui/FavoritesButton'
import RestaurantTile from '../components/ui/RestaurantTile'
import DinerTile from '../components/ui/DinerTile'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from '../state/actions/actions'

const FavoritesScreen = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.app.favorites)
  const userId = useSelector((state) => state.app.user.userId)
  const [activeTab, setActiveTab] = useState('restaurants')
  const [favoriteDiners, setFavoriteDiners] = useState(favorites.filter((fav) => fav.favorited_type === 'diner'))
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(favorites.filter((fav) => fav.favorited_type === 'restaurant'))

  console.log('FAVORITES:', favorites)
  console.log('Fav Diners: ', favoriteDiners)
  console.log('Fav Restaurants: ', favoriteRestaurants)

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId))
    }
  }, [userId])

  const renderItem = ({ item }) => {
    if (activeTab === 'restaurants') {
      return (
        <RestaurantTile
          {...item}
          favoritesTile={true}
        />
      )
    } else if (activeTab === 'diners') {
      return (
        <DinerTile
          {...item}
          favoritesTile={true}
        />
      )
    }
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={Styles.favoritesScreen.container}>
        <FavoritesButton
          isActive={activeTab === 'restaurants'}
          onPress={() => setActiveTab('restaurants')}
        >
          Restaurants
        </FavoritesButton>
        <FavoritesButton
          isActive={activeTab === 'diners'}
          onPress={() => setActiveTab('diners')}
        >
          Diners
        </FavoritesButton>
      </View>

      <View style={Styles.resturantsScreen.container}>
        <FlatList
          data={activeTab === 'restaurants' ? favoriteRestaurants : favoriteDiners}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.025 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LogoScreenWrapper>
  )
}

export default FavoritesScreen
