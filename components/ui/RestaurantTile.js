import { View, Text, TouchableOpacity, Image } from 'react-native'
import Images from '../../assets/images/images'
import Styles from '../../style'
import FavoritesIcon from './FavoritesIcon'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const RestaurantTile = ({ name, address, city, state, zip, phone, rating, cuisine, bio, image, website, restaurant_id, favoritesTile = false }) => {
  const navigation = useNavigation()

  const favorites = useSelector((state) => state.app.favorites)

  const isFavorite = favorites.some((favorite) => {
    return favorite.favorited_type === 'restaurant' && Number(favorite.favorited_id) === restaurant_id
  })

  return (
    <TouchableOpacity
      style={Styles.restaurantTile.container}
      onPress={() =>
        navigation.navigate('Screens', {
          screen: 'RestaurantDetails',
          params: {
            name,
            bio,
            address,
            city,
            state,
            zip,
            phone,
            rating,
            cuisine,
            image,
            website,
          },
        })
      }
    >
      <View style={Styles.restaurantTile.container.info}>
        <View style={Styles.restaurantTile.container.imageContainer}>
          <Image
            source={image || Images.dining_detail}
            style={Styles.restaurantTile.container.imageContainer.image}
          />
        </View>

        <View style={Styles.restaurantTile.container.textContainer}>
          <Text style={Styles.restaurantTile.container.textContainer.text.name}>{name}</Text>
          <Text
            numberOfLines={1}
            style={Styles.restaurantTile.container.textContainer.info}
          >
            {address}
          </Text>
          <Text style={Styles.restaurantTile.container.textContainer.info}>{`${city}, ${state} ${zip}`}</Text>
          <Text style={Styles.restaurantTile.container.textContainer.info}>{phone}</Text>
          <Text style={Styles.restaurantTile.container.textContainer.info}>{`${rating}/5.0 ⭐ - ${cuisine}`}</Text>
        </View>

        {favoritesTile && <FavoritesIcon isFavorited={isFavorite} />}
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantTile
