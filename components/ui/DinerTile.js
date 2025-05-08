import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileImageMedallion from './ProfileImageMedallion'
import Styles from '../../style'
import { ASSET_URL, CIRCLE_SIZE } from '../../constants/constants'
import CircularButton from './CircularButton'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const DinerTile = ({ primaryDiner = false, onPress, additionalDiner = false, firstName, lastName, username, location, imgUrl }) => {
  return (
    <View style={Styles.dinerTile.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ProfileImageMedallion
          width={CIRCLE_SIZE * 0.15}
          height={CIRCLE_SIZE * 0.15}
          borderRadius={(CIRCLE_SIZE * 0.15) / 2}
          imageUrl={ASSET_URL + imgUrl}
        />
        <View>
          {primaryDiner && <Text style={Styles.dinerTile.container.closeButtonContainer.text.primary}>Primary Diner:</Text>}
          {additionalDiner && <Text style={Styles.dinerTile.container.closeButtonContainer.text.primary}>Additional Diner:</Text>}
          <Text style={[Styles.dinerTile.container.closeButtonContainer.text.name, { fontFamily: 'Poppins-BlackItalic' }]}>
            {firstName + ' ' + lastName}
          </Text>
          <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>{'@' + username}</Text>
          <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>{location}</Text>
        </View>
      </View>

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
    </View>
  )
}

export default DinerTile
