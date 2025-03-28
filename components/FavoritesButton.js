import { TouchableOpacity, Text } from 'react-native'
import Style from '../style'

const FavoritesButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={Style.favoritesButton.container}
    >
      <Text style={Style.favoritesButton.container.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default FavoritesButton
