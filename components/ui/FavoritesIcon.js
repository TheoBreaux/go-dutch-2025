import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Style from '../../style'
import { COLORS, SCREEN_WIDTH } from '../../constants/constants'

const FavoritesIcon = ({ isFavorited = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[Style.favoritesIcon, { backgroundColor: isFavorited ? 'white' : COLORS.favoritesIconBackground }]}
      onPress={onPress}
    >
      <Ionicons
        name={isFavorited ? 'heart-sharp' : 'heart-outline'}
        size={SCREEN_WIDTH < 400 ? 30 : 40}
        color={isFavorited ? COLORS.goDutchRed : 'white'}
      />
    </TouchableOpacity>
  )
}

export default FavoritesIcon
