import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import ProfileImageMedallion from './ProfileImageMedallion'
import { ASSET_URL, CIRCLE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/constants'
import { scaleFont } from '../../utils/utils'

const DinerItemReviewModal = ({ currentDiner, setShowReviewModal, dinerItemsToReview, setReceiptItems, updateFinalDinerItems }) => {
  const [finalDinerItems, setFinalDinerItems] = useState(dinerItemsToReview)

  const handleDeleteItem = (itemToRemove) => {
    const updatedDinerItems = finalDinerItems.filter((item) => item.id !== itemToRemove.id)
    setFinalDinerItems(updatedDinerItems)
    setReceiptItems((prev) => {
      const alreadyExists = prev.some((item) => item.id === itemToRemove.id)
      return alreadyExists ? prev : [...prev, itemToRemove]
    })
  }

  const renderItem = ({ item }) => {
    return (
      <View style={[Styles.confirmableDinnerItemTile.container, { width: SCREEN_WIDTH * 0.85, height: SCREEN_HEIGHT * 0.045 }]}>
        <TouchableOpacity onPress={() => handleDeleteItem(item)}>
          <Text style={Styles.confirmableDinnerItemTile.container.text}>DELETE</Text>
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={[Styles.confirmableDinnerItemTile.container.text, { fontFamily: 'Poppins-Medium' }]}
        >
          {item.name}
        </Text>
        <Text style={Styles.confirmableDinnerItemTile.container.text}>${item.price.toFixed(2)}</Text>
      </View>
    )
  }

  return (
    <CustomModalContainer
      animationType="fade"
      height={SCREEN_HEIGHT * 0.7}
      buttonText1={'Return'}
      buttonText2={'Confirm'}
      onPress1={() => {
        updateFinalDinerItems(finalDinerItems)
        setShowReviewModal(false)
      }} //return to asignment screen and return items to array of currentUser
      onPress2={() => console.log('CONFIRM')} //go to next diner in array
    >
      <View style={Styles.dinerItemReviewModal.content}>
        <Text style={Styles.dinerItemReviewModal.text.header}>Review items for</Text>
        <ProfileImageMedallion
          height={CIRCLE_SIZE * 0.3}
          width={CIRCLE_SIZE * 0.3}
          borderRadius={(CIRCLE_SIZE * 0.3) / 2}
          imageUrl={ASSET_URL + currentDiner.imgUrl}
        />
        <Text style={Styles.dinerItemReviewModal.text.username}>@{currentDiner.username}</Text>

        <View style={{ width: SCREEN_WIDTH * 0.8 }}>
          <Text style={Styles.dinerItemReviewModal.text.instructions}>
            Press DELETE to remove an item. RETURN to go back. CONFIRM to save and continue to the next diner.
          </Text>
        </View>
        {finalDinerItems.length ? (
          <FlatList
            style={{ height: SCREEN_HEIGHT * 0.2 }}
            data={finalDinerItems}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={{ marginTop: SCREEN_HEIGHT * 0.025 }}>
            <Text style={[Styles.dinerItemReviewModal.text.instructions, { fontSize: scaleFont(20), fontFamily: 'Poppins-ExtraBold' }]}>
              Please add items.
            </Text>
          </View>
        )}
      </View>
    </CustomModalContainer>
  )
}

export default DinerItemReviewModal
