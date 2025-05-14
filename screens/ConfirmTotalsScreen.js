import { View, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import TotalsInput from '../components/ui/TotalsInput'
import PrimaryButton from '../components/ui/PrimaryButton'
import CircularButton from '../components/ui/CircularButton'
import { useEffect, useState } from 'react'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { scaleFont } from '../utils/utils'
import AddMissingFeesModal from '../components/ui/AddMissingFeesModal'
import { postDiningEvent } from '../state/actions/actions'
import * as Notifications from 'expo-notifications'

//push notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    }
  },
})

const ConfirmTotalsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const restaurantName = useSelector((state) => state.app.receiptData.restaurantName)
  const state = useSelector((state) => state.app)

  const { totals, dinersWithTotals, eventTitle, numNonCelebrating } = route.params

  const [finalSubtotal, setFinalSubtotal] = useState(totals.subtotal)
  const [showMissingFeesModal, setShowMissingFeesModal] = useState(false)
  const [newFeeName, setNewFeeName] = useState('')
  const [newFeePrice, setNewFeePrice] = useState(0)
  const [image, setImage] = useState(useSelector((state) => state.app.receiptData.imageUri))

  const [totalsArray, setTotalsArray] = useState(
    Object.entries(totals).map(([key, amount]) => ({
      fee: key,
      amount,
      text: amount.toFixed(2),
    }))
  )

  const [sharedTotal, setSharedTotal] = useState(
    totalsArray.filter(({ fee }) => fee.toLowerCase() !== 'subtotal').reduce((sum, { amount }) => sum + amount, 0)
  )

  const grandTotal = totalsArray.reduce((sum, item) => sum + item.amount, 0)

  //update shared totals as needed
  useEffect(() => {
    const updatedSharedTotal = totalsArray.filter(({ fee }) => fee.toLowerCase() !== 'subtotal').reduce((sum, { amount }) => sum + amount, 0)
    setSharedTotal(updatedSharedTotal)
  }, [totalsArray])

  const renderItem = ({ item, index }) => {
    const capitalizedFee = item.fee.charAt(0).toUpperCase() + item.fee.slice(1)

    return (
      <TotalsInput
        fee={capitalizedFee}
        value={item.text}
        onChangeText={(text) => {
          const updated = [...totalsArray]
          updated[index].text = text

          const parsed = parseFloat(text)
          if (!isNaN(parsed)) {
            updated[index].amount = parsed
          } else {
            updated[index].amount = 0
          }

          setTotalsArray(updated)
        }}
        onPress={() => {
          const updated = [...totalsArray]
          updated[index].amount = 0
          updated[index].text = ''
          setTotalsArray(updated)
        }}
      />
    )
  }

  const handleAddFee = () => {
    const parsedPrice = parseFloat(newFeePrice)

    const newFee = {
      fee: newFeeName,
      amount: !isNaN(parsedPrice) ? parsedPrice : 0,
      text: !isNaN(parsedPrice) ? parsedPrice.toFixed(2) : '0.00',
    }

    setTotalsArray((prev) => [...prev, newFee])
  }

  const handleCloseCheck = () => {
    const totalExtraFees = totalsArray.filter((item) => item.fee !== 'subtotal' && item.fee !== 'tax').reduce((sum, item) => sum + item.amount, 0)

    const splitCount = numNonCelebrating > 0 ? numNonCelebrating : dinersWithTotals.length
    const finalSharedCosts = totalExtraFees / splitCount

    const finalBill = dinersWithTotals.map((diner) => {
      if (!diner.isCelebrating) {
        return { ...diner, total: parseFloat(diner.total) + finalSharedCosts }
      }
      return diner
    })

    const formData = new FormData()

    formData.append('eventId', state.receiptData.eventId)
    formData.append('date', new Date(state.receiptData.date).toISOString().substring(0, 10))
    formData.append('restaurantName', restaurantName)
    formData.append('eventTitle', eventTitle)
    formData.append('primaryDinerId', state.receiptData.primaryDinerId)
    formData.append('subtotal', totalsArray[0].amount)
    formData.append('tax', totalsArray[1].amount)
    formData.append('tip', totalsArray[2].amount)
    formData.append('totalMealCost', grandTotal)
    formData.append('allDiners', JSON.stringify(finalBill)) // serialize the array

    if (image) {
      formData.append('receiptImage', {
        uri: image,
        name: 'receipt.jpg',
        type: 'image/jpeg',
      })
    }
    dispatch(postDiningEvent(formData))

    // SEND PAYMENT NOTIFICATIONS
    navigation.navigate('Screens', { screen: 'CheckClose', params: { finalBill } })
  }

  return (
    <LogoScreenWrapper
      opacity={0.2}
      backgroundColor={COLORS.logoScreenBackground}
    >
      {showMissingFeesModal && (
        <AddMissingFeesModal
          setShowMissingFeesModal={setShowMissingFeesModal}
          handleAddFee={handleAddFee}
          newFeeName={newFeeName}
          newFeePrice={newFeePrice}
          setNewFeeName={setNewFeeName}
          setNewFeePrice={setNewFeePrice}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={Styles.confirmTotalsScreen.container}>
          <Text style={[Styles.confirmTotalsScreen.container.text.restaurantName, { marginTop: 0 }]}>{restaurantName}</Text>
          <FlatList
            data={totalsArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.fee}-${index}`}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={{ height: SCREEN_HEIGHT * 0.35, paddingTop: SCREEN_HEIGHT * 0.015 }}
          />

          <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer}>
            <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButton}>
              <CircularButton
                onPress={() => {
                  const tipAmount = (finalSubtotal * 0.18).toFixed(2)
                  setTotalsArray((prevTotals) =>
                    prevTotals.map((feeItem) => (feeItem.fee === 'tip' ? { ...feeItem, amount: parseFloat(tipAmount), text: tipAmount } : feeItem))
                  )
                }}
              >
                18%
              </CircularButton>
              <Text style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButtonLabel}>Good</Text>
            </View>
            <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButton}>
              <CircularButton
                onPress={() => {
                  const tipAmount = (finalSubtotal * 0.2).toFixed(2)
                  setTotalsArray((prevTotals) =>
                    prevTotals.map((feeItem) => (feeItem.fee === 'tip' ? { ...feeItem, amount: parseFloat(tipAmount), text: tipAmount } : feeItem))
                  )
                }}
              >
                20%
              </CircularButton>

              <Text style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButtonLabel}>Great!</Text>
            </View>
            <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButton}>
              <CircularButton
                onPress={() => {
                  const tipAmount = (finalSubtotal * 0.25).toFixed(2)
                  setTotalsArray((prevTotals) =>
                    prevTotals.map((feeItem) => (feeItem.fee === 'tip' ? { ...feeItem, amount: parseFloat(tipAmount), text: tipAmount } : feeItem))
                  )
                }}
              >
                25%
              </CircularButton>

              <Text style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButtonLabel}>Wow!</Text>
            </View>
          </View>
          <Text style={[Styles.confirmTotalsScreen.container.text.restaurantName, { marginTop: 0 }]}>Missing fees?</Text>
          <View style={{ flexDirection: 'row' }}>
            <PrimaryButton
              onPress={() => setShowMissingFeesModal(true)} //add to flatlist additional fee
              outerWidth={SCREEN_WIDTH * 0.38}
              innerWidth={SCREEN_WIDTH * 0.36}
            >
              Yes, add fees!
            </PrimaryButton>
            <PrimaryButton
              onPress={handleCloseCheck}
              outerWidth={SCREEN_WIDTH * 0.38}
              innerWidth={SCREEN_WIDTH * 0.36}
            >
              No, confirm!
            </PrimaryButton>
          </View>
          <Text style={{ fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(26) }}>GRAND TOTAL: ${grandTotal.toFixed(2)}</Text>
        </View>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default ConfirmTotalsScreen
