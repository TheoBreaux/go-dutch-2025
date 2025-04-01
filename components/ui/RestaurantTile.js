import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/constants'
import Images from '../../assets/images/images'
import Styles from '../../style'
import FavoritesIcon from './FavoritesIcon'
import { useNavigation } from '@react-navigation/native'

const RestaurantTile = ({ restaurantName, address, city, state, zip, phone, rating, cuisine, image, website, favoritesTile = false }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={Styles.restaurantTile.container}
      onPress={() => navigation.navigate("RestaurantDetails")}
    >
      <View style={Styles.restaurantTile.container.imageContainer}>
        <Image
          source={image}
          style={Styles.restaurantTile.container.imageContainer.image}
        />
      </View>

      <View style={Styles.restaurantTile.container.textContainer}>
        <Text style={Styles.restaurantTile.container.textContainer.text}>{restaurantName}</Text>
        <Text style={Styles.restaurantTile.container.textContainer.info}>{address}</Text>
        <Text style={Styles.restaurantTile.container.textContainer.info}>{`${city}, ${state} ${zip}`}</Text>
        <Text style={Styles.restaurantTile.container.textContainer.info}>{phone}</Text>
        <Text style={Styles.restaurantTile.container.textContainer.info}>{`${rating}/5.0 ⭐ - ${cuisine}`}</Text>
      </View>
      {!!favoritesTile && (
        <View style={{ justifyContent: 'center' }}>
          <FavoritesIcon />
        </View>
      )}
    </TouchableOpacity>
  )
}

export default RestaurantTile
