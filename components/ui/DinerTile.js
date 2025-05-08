import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileImageMedallion from './ProfileImageMedallion'
import Styles from '../../style'
import { ASSET_URL, CIRCLE_SIZE } from '../../constants/constants'
import CircularButton from './CircularButton'
import FavoritesIcon from './FavoritesIcon'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../../state/actions/actions'
import { useNavigation } from '@react-navigation/native'

const DinerTile = ({ primaryDiner = false, favoritesTile = false, onPress, user_id, additionalDiner = false, item }) => {
  const Container = favoritesTile ? TouchableOpacity : View

  const dispatch = useDispatch()
  const navigation = useNavigation()
  // const favorites = useSelector((state) => state.app.favorites)

  // const isFavorite = favorites.some((favorite) => {
  //   return favorite.favorited_type === 'diner' && Number(favorite.favorited_id) === item.user_id
  // })

  //FROM WORKING RESTAURANT TILE
  const favorites = useSelector((state) => state.app.favorites)

  const isFavorite = favorites.some((favorite) => {
    return favorite.favorited_type === 'restaurant' && Number(favorite.favorited_id) === Number(item.restaurant_id)
  })





  return (
    <Container
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
          {primaryDiner && <Text style={Styles.dinerTile.container.closeButtonContainer.text.primary}>Primary Diner:</Text>}
          {additionalDiner && <Text style={Styles.dinerTile.container.closeButtonContainer.text.primary}>Additional Diner:</Text>}
          <Text style={[Styles.dinerTile.container.closeButtonContainer.text.name, { fontFamily: 'Poppins-BlackItalic' }]}>
            {item.first_name + ' ' + item.last_name}
          </Text>
          <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>{'@' + item.username}</Text>
          {favoritesTile && <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>{item.location}</Text>}
        </View>
      </View>

      {favoritesTile ? (
        <FavoritesIcon
          isFavorited={isFavorite}
          onPress={() => {
            dispatch(toggleFavorite({ ...item, userId: item.user_id }))
          }}
        />
      ) : (
        <CircularButton
          onPress={onPress}
          icon={
            <FontAwesome
              name="close"
              size={24}
              color="white"
            />
          }
        />
      )}
    </Container>
  )
}

export default DinerTile
