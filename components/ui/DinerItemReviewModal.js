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

const DinerItemReviewModal = ({
  currentDiner,
  currentDinerIndex,
  setCurrentDinerIndex,
  setShowReviewModal,
  finalDiners,
  dinerItemsToReview,
  setReceiptItems,
  updateFinalDinerItems,
  eventTitle,
  sharedItems,
}) => {
  const [finalDinerItems, setFinalDinerItems] = useState(dinerItemsToReview)
  const [finalDinerConfirmed, setFinalDinerConfirmed] = useState(false)

  const navigation = useNavigation()
  const celebratedDinersPresent = finalDiners.some((diner) => diner.isCelebrating)

  const subtotal = useSelector((state) => state.app.receiptData.subtotal)
  const tax = useSelector((state) => state.app.receiptData.tax)

  const sharedDinerItemsTotal = sharedItems.reduce((sum, item) => {
    return sum + item.price
  }, 0)

  const handleDeleteItem = (itemToRemove) => {
    const updatedDinerItems = finalDinerItems.filter((item) => item.id !== itemToRemove.id)
    setFinalDinerItems(updatedDinerItems)
    setReceiptItems((prev) => {
      const alreadyExists = prev.some((item) => item.id === itemToRemove.id)
      return alreadyExists ? prev : [...prev, itemToRemove]
    })
  }

  const handleResetDinerItems = () => {
    updateFinalDinerItems(finalDinerItems)
    setShowReviewModal(false)
  }

  const handleNextDiner = () => {
    const tip = subtotal * 0.2
    const totals = { subtotal, tax, tip } //subtotal, tax, tip

    const dinersWithTotals = finalDiners.map((diner) => {
      const total = (diner.items || []).reduce((sum, item) => sum + item.price, 0)
      return {
        id: diner.userId,
        username: diner.username,
        firstName: diner.firstName,
        isCelebrating: diner.isCelebrating || null,
        total: total,
        isPrimaryDiner: diner.isPrimaryDiner,
      }
    })

    //if the index in the array of the current diner is less than the length of the array of final diners
    if (currentDinerIndex < finalDiners.length - 1) {
      setCurrentDinerIndex((prevIndex) => prevIndex + 1)
      setShowReviewModal(false)
      //else statement will move us on to finalizing bill
    } else if (currentDinerIndex === finalDiners.length - 1) {
      if (celebratedDinersPresent) {
        setFinalDinerConfirmed(true)
      } else {
        navigation.navigate('Screens', { screen: 'ConfirmTotals', params: { totals, dinersWithTotals, eventTitle, sharedDinerItemsTotal } })
      }
    }
  }

  const handleNoOnCelebratedDiners = () => {
    //do math for everyone paying their own
    const tip = subtotal * 0.2
    const totals = { subtotal, tax, tip } //subtotal, tax, tip

    const dinersWithTotals = finalDiners.map((diner) => {
      const total = (diner.items || []).reduce((sum, item) => sum + item.price, 0)
      return {
        id: diner.userId,
        username: diner.username,
        firstName: diner.firstName,
        isCelebrating: diner.isCelebrating || null,
        total: total,
        isPrimaryDiner: diner.isPrimaary,
      }
    })

    navigation.navigate('Screens', { screen: 'ConfirmTotals', params: { totals, dinersWithTotals, eventTitle, sharedDinerItemsTotal } })
  }

  const handleYesOnCelebratedDiners = () => {
    const tip = subtotal * 0.2
    const totals = { subtotal, tax, tip } //subtotal, tax, tip

    const dinersWithTotals = finalDiners.map((diner) => {
      const total = (diner.items || []).reduce((sum, item) => sum + item.price, 0)
      return {
        id: diner.userId,
        username: diner.username,
        firstName: diner.firstName,
        isCelebrating: diner.isCelebrating || null,
        total: total,
        isPrimaryDiner: diner.isPrimaary,
      }
    })

    const celebratedDiners = finalDiners.filter((diner) => diner.isCelebrating)

    const celebratedDinersTotal = celebratedDiners.reduce((sum, celebratingDiner) => {
      const match = dinersWithTotals.find((diner) => diner.id === celebratingDiner.userId)
      return sum + (match?.total || 0)
    }, 0)

    navigation.navigate('Screens', {
      screen: 'ConfirmTotals',
      params: { totals, dinersWithTotals, eventTitle, celebratedDinersTotal, sharedDinerItemsTotal },
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
      buttonText1={finalDinerConfirmed ? 'Yes' : 'Return'}
      buttonText2={finalDinerConfirmed ? 'No' : 'Confirm'}
      onPress1={finalDinerConfirmed ? handleYesOnCelebratedDiners : handleResetDinerItems} //yes
      onPress2={finalDinerConfirmed ? handleNoOnCelebratedDiners : handleNextDiner} //no
    >
      {finalDinerConfirmed ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={Images.celebration_emoji}
            style={{ height: SCREEN_HEIGHT * 0.3, resizeMode: 'contain' }}
          />
          <Text style={[Styles.dinerItemReviewModal.text.username, { fontSize: scaleFont(20), marginTop: 10, textAlign: 'center' }]}>
            Taking care of celebrated diner(s)?
          </Text>
        </View>
      ) : (
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
      )}
    </CustomModalContainer>
  )
}

export default DinerItemReviewModal
