import { View, Text, TouchableOpacity, Image } from 'react-native'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { COLORS, SCREEN_WIDTH } from '../../constants/constants'
import { scaleFont } from '../../utils/utils'

const DiningTile = ({ primaryDinerUsername, diningDate, eventTitle, eventLocation, onPress }) => {
  return (
    <TouchableOpacity
      style={[Styles.restaurantTile.container, { alignItems: 'center' }]}
      onPress={onPress}
    >
      <View style={Styles.restaurantTile.container.imageContainer}>
        <Image
          source={Images.go_dutch_background}
          style={Styles.restaurantTile.container.imageContainer.image}
        />
      </View>

      <View style={[Styles.restaurantTile.container.textContainer, { width: SCREEN_WIDTH }]}>
        <Text
          style={[
            Styles.restaurantTile.container.textContainer.info,
            { color: COLORS.goDutchBlue, fontSize: scaleFont(20), fontFamily: 'Poppins-BlackItalic' },
          ]}
        >
          {eventLocation}
        </Text>
        <Text style={[Styles.restaurantTile.container.textContainer.text, { fontSize: scaleFont(16) }]}>{diningDate?.substring(0, 10)}</Text>
        <Text style={[Styles.restaurantTile.container.textContainer.info, { fontSize: scaleFont(16), color: COLORS.goDutchRed }]}>{eventTitle}</Text>
        <Text style={[Styles.restaurantTile.container.textContainer.info, { fontSize: SCREEN_WIDTH < 400 ? scaleFont(13) : scaleFont(16) }]}>
          <Text style={{ fontFamily: 'Poppins-BlackItalic', color: COLORS.goDutchRed, fontSize: SCREEN_WIDTH < 400 ? scaleFont(15) : scaleFont(18) }}>
            Primary Diner:
          </Text>
          @{primaryDinerUsername}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default DiningTile
