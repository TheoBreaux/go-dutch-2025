import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS } from '../constants/constants'
import Style from '../style'

const FavoritesIcon = () => {
  return (
    <TouchableOpacity style={Style.favoritesIcon}>
      <Ionicons
        name="heart-outline"
        size={40}
        color={'white'}
      />
    </TouchableOpacity>
  )
}

export default FavoritesIcon

const styles = StyleSheet.create({})
