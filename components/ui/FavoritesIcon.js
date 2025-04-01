import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Style from '../../style'
import { COLORS } from '../../constants/constants'

const FavoritesIcon = ({ isFavorited = false }) => {
  return (
    <TouchableOpacity style={Style.favoritesIcon}>
      <Ionicons
        name={isFavorited ? 'heart-sharp' : 'heart-outline'}
        size={40}
        color={isFavorited ? COLORS.goDutchRed : 'white'}
      />
    </TouchableOpacity>
  )
}

export default FavoritesIcon
