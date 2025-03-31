import { View, Image } from 'react-native'
import Images from '../../assets/images/images'

const GoDutchIcon = ({ color, size }) => {
  return (
    <View>
      <Image
        source={Images.go_dutch_split_button}
        style={{
          width: size,
          height: size,
          tintColor: color,
          resizeMode: 'contain',
        }}
      />
    </View>
  )
}

export default GoDutchIcon
