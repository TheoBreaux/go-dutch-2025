import { View, Text, Image, TouchableOpacity } from 'react-native'
import PrimaryButton from './ui/PrimaryButton'
import FavoritesIcon from './ui/FavoritesIcon'
import Styles from '../style'
import Images from '../assets/images/images'
import { handleExternalLink, handleCallRestaurant } from '../utils/utils'
import { ASSET_URL } from '../constants/constants'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../state/actions/actions'

const SliderItem = ({ name, imgUrl, address, city, state, zip, rating, website, phone, bio, cuisine, item }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const favorites = useSelector((state) => state.app.favorites)

  const isFavorite = favorites.some((favorite) => {
    return (
      (favorite.favorited_type === 'restaurant' && favorite.favorited_id === item.restaurantId) ||
      (favorite.favorited_type === 'diner' && favorite.favorited_id === item.userId)
    )
  })

  return (
    <View style={Styles.homeScreen.sliderItem.container}>
      <View style={Styles.homeScreen.sliderItem.container.carouselContainer}>
        <Image
          source={imgUrl ? { uri: ASSET_URL + imgUrl } : Images.dining_detail}
          style={[Styles.homeScreen.sliderItem.container.carouselContainer.image]}
        />

        <View style={Styles.homeScreen.sliderItem.container.carouselContainer.favoritesIconContainer}>
          <FavoritesIcon
            isFavorited={isFavorite}
            onPress={() => {
              dispatch(toggleFavorite(item))
            }}
          />
        </View>

        <View style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer}>
          <TouchableOpacity
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
                  imgUrl,
                  website,
                },
              })
            }
          >
            <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.name}>{name}</Text>
          </TouchableOpacity>

          <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.address}>{address}</Text>
          <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.address}>{`${city}, ${state} ${zip}`}</Text>
          <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.address}>{`Rating: ${rating} ⭐`}</Text>
          <View style={{ flexDirection: 'row' }}>
            <PrimaryButton onPress={() => handleCallRestaurant(phone)}>Call</PrimaryButton>
            <PrimaryButton onPress={() => handleExternalLink(website)}>Reserve</PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SliderItem
