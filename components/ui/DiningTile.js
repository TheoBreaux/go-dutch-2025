import { View, Text, TouchableOpacity, Image } from 'react-native'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { COLORS, SCREEN_WIDTH } from '../../constants/constants'
import { scaleFont } from '../../utils/utils'

const DiningTile = ({ date, restaurant, event, primaryDiner }) => {
  return (
    <TouchableOpacity
      style={[Styles.restaurantTile.container, { alignItems: 'center' }]}
      onPress={() => {}}
    >
      <View style={Styles.restaurantTile.container.imageContainer}>
        <Image
          source={Images.go_dutch_background}
          style={Styles.restaurantTile.container.imageContainer.image}
        />
      </View>

      <View style={Styles.restaurantTile.container.textContainer}>
        <Text style={[Styles.restaurantTile.container.textContainer.info, { color: COLORS.goDutchBlue, fontSize: scaleFont(18) }]}>{restaurant}</Text>
        <Text style={[Styles.restaurantTile.container.textContainer.text, { fontSize: scaleFont(16) }]}>{date}</Text>
        <Text style={[Styles.restaurantTile.container.textContainer.info, { fontSize: scaleFont(16), color: COLORS.goDutchRed }]}>{event}</Text>
        <Text style={[Styles.restaurantTile.container.textContainer.info, { fontSize:  SCREEN_WIDTH < 400 ?  scaleFont(13): scaleFont(15) }]}>
          <Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: SCREEN_WIDTH < 400 ? scaleFont(14): scaleFont(16) }}>Primary Diner:</Text> {primaryDiner}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default DiningTile
