import { FlatList, View } from 'react-native'
import { useState } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import FavoritesButton from '../components/ui/FavoritesButton'
import RestaurantTile from '../components/ui/RestaurantTile'
import DinerTile from '../components/ui/DinerTile'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import { useSelector } from 'react-redux'

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.app.favorites)
  const [activeTab, setActiveTab] = useState('restaurants')

  const favoriteDiners = favorites.filter((fav) => fav.favorited_type === 'diner')
  const favoriteRestaurants = favorites.filter((fav) => fav.favorited_type === 'restaurant')

  const renderItem = ({ item }) => {
    if (activeTab === 'restaurants') {
      return (
        <RestaurantTile
          {...item.restaurant}
          favoritesTile={true}
        />
      )
    } else if (activeTab === 'diners') {
      return (
        <DinerTile
          {...item.diner}
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
