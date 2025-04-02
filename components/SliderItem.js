import { View, Text, Image } from 'react-native'
import PrimaryButton from './ui/PrimaryButton'
import FavoritesIcon from './ui/FavoritesIcon'
import Styles from '../style'

const SliderItem = ({ restaurantName, image, address, city, state, zip, rating, index }) => {
  return (
    <View style={Styles.homeScreen.sliderItem.container}>
      <View style={Styles.homeScreen.sliderItem.container.carouselContainer}>
        <Image
          source={image}
          style={Styles.homeScreen.sliderItem.container.carouselContainer.image}
        />
        <View style={Styles.homeScreen.sliderItem.container.carouselContainer.favoritesIconContainer}>
          <FavoritesIcon />
        </View>

        <View style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer}>
          <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.name}>{restaurantName}</Text>
          <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.address}>{address}</Text>
          <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.address}>{`${city}, ${state} ${zip}`}</Text>
          <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.address}>{`Rating: ${rating} ⭐`}</Text>
          <PrimaryButton>Reserve</PrimaryButton>
        </View>
      </View>
    </View>
  )
}

export default SliderItem
