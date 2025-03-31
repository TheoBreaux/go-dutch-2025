import { View, Text, Image } from 'react-native'
import PrimaryButton from './ui/PrimaryButton'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import { scaleFont } from '../utils/utils'
import FavoritesIcon from '../components/ui/FavoritesIcon'

const SliderItem = ({ restaurantName, image, address, city, state, zip, rating, index }) => {
  return (
    <View style={{ alignItems: 'center', width: SCREEN_WIDTH }}>
      <View style={{ borderWidth: 2, borderColor: 'black', borderRadius: 20, overflow: 'hidden' }}>
        <Image
          source={image}
          style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.4 }}
        />
        <View style={{ alignItems: 'flex-end', position: 'absolute', right: 10, top: 10 }}>
          <FavoritesIcon />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: scaleFont(30) }}>{restaurantName}</Text>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: scaleFont(18) }}>{address}</Text>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: scaleFont(18) }}>{`${city}, ${state} ${zip}`}</Text>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: scaleFont(18) }}>{`Rating: ${rating} ⭐`}</Text>
          <PrimaryButton>Reserve</PrimaryButton>
        </View>
      </View>
    </View>
  )
}

export default SliderItem
