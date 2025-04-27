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
  sharedItems,
  eventTitle,
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
    //if the index in the array of the current diner is less than the length of the array of final diners
    if (currentDinerIndex < finalDiners.length - 1) {
      setCurrentDinerIndex((prevIndex) => prevIndex + 1)
      setShowReviewModal(false)
      //else statement will move us on to finalizing bill
    } else if (currentDinerIndex === finalDiners.length - 1) {
      if (celebratedDinersPresent) {
        setFinalDinerConfirmed(true)
      } else {
        handleCelebratedDiners('no')
      }
    }
  }

  const handleCelebratedDiners = (status) => {
    const tip = subtotal * 0.2
    const totals = { subtotal, tax, tip }

    const celebratedDiners = finalDiners.filter((diner) => diner.isCelebrating)

    const baseDinerTotals = finalDiners.map((diner) => {
      const total = (diner.items || []).reduce((sum, item) => sum + item.price, 0)
      return { ...diner, total }
    })

    const celebratedDinersTotal = baseDinerTotals.filter((diner) => diner.isCelebrating).reduce((sum, diner) => sum + diner.total, 0)
    const numNonCelebrating = finalDiners.length - celebratedDiners.length
    const sharedExpensesForCelebratedDiners = numNonCelebrating > 0 ? celebratedDinersTotal / numNonCelebrating : 0
    const sharedTax = numNonCelebrating > 0 ? tax / numNonCelebrating : 0
    const sharedDinerItems = numNonCelebrating > 0 ? sharedDinerItemsTotal / numNonCelebrating : 0

    let dinersWithTotals = baseDinerTotals.map((diner) => {
      // Calculate the total including shared expenses, tax, and diner items for all diners
      const total = diner.total + sharedExpensesForCelebratedDiners + sharedTax + sharedDinerItems

      // If the status is 'yes', set the total of celebrated diners to 0, otherwise keep their total
      if (diner.isCelebrating && status === 'yes') {
        return {
          id: diner.userId,
          username: diner.username,
          firstName: diner.firstName,
          isCelebrating: diner.isCelebrating,
          total: 0, // Celebrating diners have a total of 0 if status is 'yes'
          isPrimaryDiner: diner.isPrimaryDiner,
        }
      } else {
        return {
          id: diner.userId,
          username: diner.username,
          firstName: diner.firstName,
          isCelebrating: diner.isCelebrating,
          total: total, // Non-celebrating diners or any status, they get the calculated total
          isPrimaryDiner: diner.isPrimaryDiner,
        }
      }
    })

    navigation.navigate('Screens', {
      screen: 'ConfirmTotals',
      params: { totals, dinersWithTotals, eventTitle, numNonCelebrating },
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
      onPress1={finalDinerConfirmed ? () => handleCelebratedDiners('yes') : handleResetDinerItems} //yes
      onPress2={finalDinerConfirmed ? () => handleCelebratedDiners('no') : handleNextDiner} //no
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
