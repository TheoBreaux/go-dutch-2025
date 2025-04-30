import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import Images from '../../assets/images/images'
import ProfileImageMedallion from './ProfileImageMedallion'
import { ASSET_URL, CIRCLE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/constants'
import { scaleFont } from '../../utils/utils'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import PrimaryButton from './PrimaryButton'

const DiningDetailsModal = ({ diningEvent, onClose, showDiningDetailsModal }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer}>
      <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.username}>
        @{item.username}
        {item.isPrimaryDiner && (
          <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.primaryDinerText}>$PRIMARY DINER</Text>
        )}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.total}>${parseFloat(item.total).toFixed(2)}</Text>
        {item.isCelebrating && (
          <Image
            source={Images.celebration_emoji}
            style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.emoji}
          />
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <CustomModalContainer
      buttons={false}
      animationType="fade"
      visible={showDiningDetailsModal}
    >
      <View style={{ flex: 1, alignItems: 'center', padding: 20, borderRadius: 10, width: SCREEN_WIDTH }}>
        <Image
          source={Images.go_dutch_split_button}
          style={{ width: CIRCLE_SIZE * 0.25, height: CIRCLE_SIZE * 0.25, resizeMode: 'contain' }}
        />
        <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.eventTitle}>
          {diningEvent.eventLocation} - {diningEvent.eventTitle}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={{}}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.015 }}
        />
        <PrimaryButton onPress={onClose}>Close</PrimaryButton>
      </View>
    </CustomModalContainer>
  )
}

export default DiningDetailsModal
