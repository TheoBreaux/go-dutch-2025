import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileImageMedallion from './ProfileImageMedallion'
import Styles from '../../style'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/constants'
import CircularButton from './CircularButton'

const DinerTile = ({ primaryDiner = false }) => {
  return (
    <View style={Styles.dinerTile.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ProfileImageMedallion
          width={SCREEN_WIDTH * 0.15}
          height={SCREEN_HEIGHT * 0.075}
          borderRadius={'50%'}
        />
        <View>
          {primaryDiner && <Text style={Styles.dinerTile.container.closeButtonContainer.text.primary}>Primary Diner:</Text>}
          <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>First Name</Text>
          <Text style={Styles.dinerTile.container.closeButtonContainer.text.name}>Username</Text>
        </View>
      </View>

      <CircularButton
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
