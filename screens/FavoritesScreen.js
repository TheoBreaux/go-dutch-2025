import { FlatList, View } from 'react-native'
import React, { useState } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import FavoritesButton from '../components/ui/FavoritesButton'
import RestaurantTile from '../components/ui/RestaurantTile'
import DinerTile from '../components/ui/DinerTile'

const FavoritesScreen = () => {
  const [activeTab, setActiveTab] = useState('restaurants')

  return (
    <LogoScreenWrapper>
      <View style={Styles.favoritesScreen.container}>
        <FavoritesButton onPress={setActiveTab('restaurants')}>Restaurants</FavoritesButton>
        <FavoritesButton onPress={setActiveTab('diners')}>Diners</FavoritesButton>
      </View>
    </LogoScreenWrapper>
  )
}

export default FavoritesScreen
