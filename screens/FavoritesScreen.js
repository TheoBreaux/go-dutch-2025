import { FlatList, View } from 'react-native'
import React from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import FavoritesButton from '../components/ui/FavoritesButton'

const FavoritesScreen = () => {
  return (
    <LogoScreenWrapper>
      <View style={Style.favoritesScreen.container}>
        <FavoritesButton onPress={() => {}}>Restaurants</FavoritesButton>
        <FavoritesButton onPress={() => {}}>Diners</FavoritesButton>
      </View>
    </LogoScreenWrapper>
  )
}

export default FavoritesScreen
