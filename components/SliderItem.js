import { View, Text, Image } from 'react-native'
import PrimaryButton from './ui/PrimaryButton'
import FavoritesIcon from './ui/FavoritesIcon'
import Styles from '../style'
import Images from '../assets/images/images'
import { handleExternalLink, handleCallRestaurant } from '../utils/utils'

const SliderItem = ({ name, image, address, city, state, zip, rating, website, phone }) => {
  return (
    <View style={Styles.homeScreen.sliderItem.container}>
      <View style={Styles.homeScreen.sliderItem.container.carouselContainer}>

      
          <Image
            source={image || Images.dining_detail}
            style={[Styles.homeScreen.sliderItem.container.carouselContainer.image]}
          />
      

        <View style={Styles.homeScreen.sliderItem.container.carouselContainer.favoritesIconContainer}>
          <FavoritesIcon />
        </View>

        <View style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer}>
          <Text style={Styles.homeScreen.sliderItem.container.restaurantInfoContainer.text.name}>{name}</Text>
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
