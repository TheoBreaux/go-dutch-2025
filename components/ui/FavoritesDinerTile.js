import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileImageMedallion from './ProfileImageMedallion'
import Styles from '../../style'
import { ASSET_URL, CIRCLE_SIZE } from '../../constants/constants'
import FavoritesIcon from './FavoritesIcon'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../../state/actions/actions'
import { useNavigation } from '@react-navigation/native'

const FavoritesDinerTile = ({ item }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const favorites = useSelector((state) => state.app.favorites)

  const isFavorite = favorites.some((favorite) => {
    return favorite.favorited_type === 'diner' && Number(favorite.favorited_id) === Number(item.user_id)
  })

  return (
    <TouchableOpacity
      style={Styles.dinerTile.container}
      onPress={() =>
        navigation.navigate('Screens', {
          screen: 'Profile',
          params: {
            item,
          },
        })
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ProfileImageMedallion
          width={CIRCLE_SIZE * 0.15}
          height={CIRCLE_SIZE * 0.15}
          borderRadius={(CIRCLE_SIZE * 0.15) / 2}
          imageUrl={ASSET_URL + item.img_url}
        />
        <View>
          <Text style={[Styles.dinerTile.container.closeButtonContainer.text.name, { fontFamily: 'Poppins-BlackItalic' }]}>
            {item.first_name + ' ' + item.last_name}
          </Text>
          <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>{'@' + item.username}</Text>
          <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>{item.location}</Text>
        </View>
      </View>

      <FavoritesIcon
        isFavorited={isFavorite}
        onPress={() => {
          dispatch(toggleFavorite({ ...item, userId: item.user_id }))
        }}
      />
    </TouchableOpacity>
  )
}

export default FavoritesDinerTile
