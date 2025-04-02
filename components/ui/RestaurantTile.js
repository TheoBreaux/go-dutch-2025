import { View, Text, TouchableOpacity, Image } from 'react-native'
import Images from '../../assets/images/images'
import Styles from '../../style'
import FavoritesIcon from './FavoritesIcon'
import { useNavigation } from '@react-navigation/native'

const RestaurantTile = ({ name, address, city, state, zip, phone, rating, cuisine, bio, image, website, favoritesTile = false }) => {
  const navigation = useNavigation()

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
          <Text style={Styles.restaurantTile.container.textContainer.text}>{name}</Text>
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
        {!favoritesTile && (
          <View style={{ justifyContent: 'center' }}>
            <FavoritesIcon />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantTile
