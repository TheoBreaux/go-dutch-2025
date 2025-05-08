import { View, Text, TouchableOpacity, Image } from 'react-native'
import Images from '../../assets/images/images'
import Styles from '../../style'
import FavoritesIcon from './FavoritesIcon'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../../state/actions/actions'

const RestaurantTile = ({ favoritesTile = false, item }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const favorites = useSelector((state) => state.app.favorites)

  const isFavorite = favorites.some((favorite) => {
    return favorite.favorited_type === 'restaurant' && Number(favorite.favorited_id) === Number(item.restaurant_id)
  })

  return (
    <TouchableOpacity
      style={Styles.restaurantTile.container}
      onPress={() =>
        navigation.navigate('Screens', {
          screen: 'RestaurantDetails',
          params: { item },
        })
      }
    >
      <View style={Styles.restaurantTile.container.info}>
        <View style={Styles.restaurantTile.container.imageContainer}>
          <Image
            source={item.image || Images.dining_detail}
            style={Styles.restaurantTile.container.imageContainer.image}
          />
        </View>

        <View style={Styles.restaurantTile.container.textContainer}>
          <Text style={Styles.restaurantTile.container.textContainer.text.name}>{item.name}</Text>
          <Text
            numberOfLines={1}
            style={Styles.restaurantTile.container.textContainer.info}
          >
            {item.address}
          </Text>
          <Text style={Styles.restaurantTile.container.textContainer.info}>{`${item.city}, ${item.state} ${item.zip}`}</Text>
          <Text style={Styles.restaurantTile.container.textContainer.info}>{item.phone}</Text>
          <Text style={Styles.restaurantTile.container.textContainer.info}>{`${item.rating}/5.0 ⭐ - ${item.cuisine}`}</Text>
        </View>

        {favoritesTile && (
          <FavoritesIcon
            isFavorited={isFavorite}
            onPress={() => {
              dispatch(toggleFavorite({ ...item, restaurantId: item.restaurant_id }))
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantTile
