import { FlatList, View, Text } from 'react-native'
import { useState } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import FavoritesButton from '../components/ui/FavoritesButton'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import { useSelector } from 'react-redux'
import FavoritesDinerTile from '../components/ui/FavoritesDinerTile'
import FavoritesRestaurantTile from '../components/ui/FavoritesRestaurantTile'

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.app.favorites)
  const [activeTab, setActiveTab] = useState('restaurants')

  const favoriteDiners = favorites.filter((fav) => fav.favorited_type === 'diner')
  const favoriteRestaurants = favorites.filter((fav) => fav.favorited_type === 'restaurant')

  const renderItem = ({ item }) => {
    if (activeTab === 'restaurants') {
      return <FavoritesRestaurantTile item={item.restaurant} />
    } else if (activeTab === 'diners') {
      return <FavoritesDinerTile item={item.diner} />
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

      <View style={[Styles.resturantsScreen.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        {activeTab === 'restaurants' && favoriteRestaurants.length === 0 ? (
          <Text style={Styles.favoritesScreen.container.text}>No favorite restaurants yet.</Text>
        ) : activeTab === 'diners' && favoriteDiners.length === 0 ? (
          <Text style={Styles.favoritesScreen.container.text}>No favorite diners yet.</Text>
        ) : (
          <FlatList
            data={activeTab === 'restaurants' ? favoriteRestaurants : favoriteDiners}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.025 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </LogoScreenWrapper>
  )
}

export default FavoritesScreen
