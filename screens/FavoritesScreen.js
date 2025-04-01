import { FlatList, View } from 'react-native'
import React, { useState } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import FavoritesButton from '../components/ui/FavoritesButton'
import RestaurantTile from '../components/ui/RestaurantTile'
import DinerTile from '../components/ui/DinerTile'
import { RESTAURANT_DATA, DINER_DATA } from '../constants/data'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'

const FavoritesScreen = () => {
  const [activeTab, setActiveTab] = useState('restaurants')

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
        <FavoritesButton onPress={() => setActiveTab('restaurants')}>Restaurants</FavoritesButton>
        <FavoritesButton onPress={() => setActiveTab('diners')}>Diners</FavoritesButton>
      </View>
      <FlatList
        data={activeTab === 'restaurants' ? RESTAURANT_DATA : DINER_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.025 }}
        showsVerticalScrollIndicator={false}
      />
    </LogoScreenWrapper>
  )
}

export default FavoritesScreen
