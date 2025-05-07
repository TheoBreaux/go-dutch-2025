import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileImageMedallion from './ProfileImageMedallion'
import Styles from '../../style'
import { ASSET_URL, CIRCLE_SIZE } from '../../constants/constants'
import CircularButton from './CircularButton'
import FavoritesIcon from './FavoritesIcon'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useSelector } from 'react-redux'

const DinerTile = ({
  primaryDiner = false,
  favoritesTile = false,
  onPress,
  first_name,
  last_name,
  username,
  location,
  img_url,
  user_id,
  additionalDiner = false,
}) => {
  const Container = favoritesTile ? TouchableOpacity : View

  const favorites = useSelector((state) => state.app.favorites)

  const isFavorite = favorites.some((favorite) => {
    return favorite.favorited_type === 'diner' && Number(favorite.favorited_id) === user_id
  })

  return (
    <Container style={Styles.dinerTile.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ProfileImageMedallion
          width={CIRCLE_SIZE * 0.15}
          height={CIRCLE_SIZE * 0.15}
          borderRadius={(CIRCLE_SIZE * 0.15) / 2}
          imageUrl={ASSET_URL + img_url}
        />
        <View>
          {primaryDiner && <Text style={Styles.dinerTile.container.closeButtonContainer.text.primary}>Primary Diner:</Text>}
          {additionalDiner && <Text style={Styles.dinerTile.container.closeButtonContainer.text.primary}>Additional Diner:</Text>}
          <Text style={[Styles.dinerTile.container.closeButtonContainer.text.name, { fontFamily: 'Poppins-BlackItalic' }]}>
            {first_name + ' ' + last_name}
          </Text>
          <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>{'@' + username}</Text>
          {favoritesTile && <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>{location}</Text>}
        </View>
      </View>

      {favoritesTile ? (
        <FavoritesIcon isFavorited={isFavorite} />
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
