import { View, Text, TouchableOpacity, Image } from 'react-native'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { COLORS } from '../../constants/constants'

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
        <Text style={[Styles.restaurantTile.container.textContainer.info, { color: COLORS.goDutchBlue, fontSize: 18 }]}>{restaurant}</Text>
        <Text style={[Styles.restaurantTile.container.textContainer.text, { fontSize: 16 }]}>{date}</Text>
        <Text style={[Styles.restaurantTile.container.textContainer.info, { fontSize: 16, color: COLORS.goDutchRed }]}>{event}</Text>
        <Text style={[Styles.restaurantTile.container.textContainer.info, { fontSize: 16 }]}>
          <Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: 16 }}>Primary Diner:</Text> {primaryDiner}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default DiningTile
