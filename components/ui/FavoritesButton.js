import { TouchableOpacity, Text } from 'react-native'
import Style from '../../style'
import { COLORS } from '../../constants/constants'

const FavoritesButton = ({ children, onPress, isActive }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Style.favoritesButton.container, isActive && { backgroundColor: COLORS.goDutchRed }]}
    >
      <Text style={[Style.favoritesButton.container.text, isActive && { color: 'white' }]}>{children}</Text>
    </TouchableOpacity>
  )
}

export default FavoritesButton
