import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileImageMedallion from './ProfileImageMedallion'
import Styles from '../../style'
import { ASSET_URL, CIRCLE_SIZE } from '../../constants/constants'

const SuggestionItem = ({ onPress, firstName, lastName, username, imgUrl }) => {
  return (
    <TouchableOpacity
      style={Styles.suggestionItem.container}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ProfileImageMedallion
          width={CIRCLE_SIZE * 0.1}
          height={CIRCLE_SIZE * 0.1}
          borderRadius={(CIRCLE_SIZE * 0.1) / 2}
          imageUrl={ASSET_URL + imgUrl}
        />
        <View>
          <Text style={Styles.suggestionItem.container.text.name}>{firstName + ' ' + lastName}</Text>
          <Text style={Styles.suggestionItem.container.text.username}>{'@' + username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SuggestionItem
