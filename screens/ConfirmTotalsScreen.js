import { View, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import TotalsInput from '../components/ui/TotalsInput'
import PrimaryButton from '../components/ui/PrimaryButton'
import CircularButton from '../components/ui/CircularButton'
import { useEffect, useState } from 'react'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import { useSelector } from 'react-redux'
import { scaleFont } from '../utils/utils'
import AddMissingFeesModal from '../components/ui/AddMissingFeesModal'

const ConfirmTotalsScreen = ({ route, navigation }) => {
  const restaurantName = useSelector((state) => state.app.receiptData.restaurantName)

  const { totals, dinersWithTotals, eventTitle, numNonCelebrating } = route.params

  const [finalSubtotal, setFinalSubtotal] = useState(totals.subtotal)
  const [showMissingFeesModal, setShowMissingFeesModal] = useState(false)
  const [newFeeName, setNewFeeName] = useState('')
  const [newFeePrice, setNewFeePrice] = useState(0)

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
        return { ...diner, total: diner.total + finalSharedCosts }
      }
      return diner
    })

    //ALSO NEED TO SEND ALL OF THIS TO BACKEND DATABASE AND UPDATE STATE
    // SEND PAYMENT NOTIFICATIONS
    navigation.navigate('Screens', { screen: 'CheckClose', params: { finalBill, eventTitle } })
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
            style={{ height: SCREEN_HEIGHT * 0.4 }}
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
          <Text style={{ fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(28) }}>GRAND TOTAL: ${grandTotal.toFixed(2)}</Text>
        </View>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default ConfirmTotalsScreen
