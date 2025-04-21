import { View, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import TotalsInput from '../components/ui/TotalsInput'
import PrimaryButton from '../components/ui/PrimaryButton'
import CircularButton from '../components/ui/CircularButton'
import { useState } from 'react'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import { useSelector } from 'react-redux'
import { scaleFont } from '../utils/utils'

const ConfirmTotalsScreen = ({ route }) => {
  const restaurantName = useSelector((state) => state.app.receiptData.restaurantName)

  const { totals, dinersWithTotals, eventTitle } = route.params

  const [finalSubtotal, setFinalSubtotal] = useState(totals.subtotal)
  const [subtotalInputText, setSubtotalInputText] = useState(finalSubtotal.toFixed(2))
  const [finalTax, setFinalTax] = useState(totals.tax)
  const [taxInputText, setTaxInputText] = useState(finalTax.toFixed(2))
  const [finalTip, setFinalTip] = useState(totals.tip)
  const [tipInputText, setTipInputText] = useState(finalTip.toFixed(2))
  const [additionalFees, setAdditionalFees] = useState(0)
  const [totalsArray, setTotalsArray] = useState(
    Object.entries(totals).map(([key, amount]) => ({
      fee: key,
      amount,
      text: amount.toFixed(2),
    }))
  )
  const grandTotal = totalsArray.reduce((sum, item) => sum + item.amount, 0)

  console.log('TOTALS ARRAY:', totalsArray)
  console.log(totals, dinersWithTotals, grandTotal)

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

  return (
    <LogoScreenWrapper
      opacity={0.2}
      backgroundColor={COLORS.logoScreenBackground}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100} // Adjust based on your header/nav height
      >
        <View style={Styles.confirmTotalsScreen.container}>
          <Text style={[Styles.confirmTotalsScreen.container.text.restaurantName, { marginTop: 0 }]}>{restaurantName}</Text>
          <FlatList
            data={totalsArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.fee}-${index}`}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{ paddingBottom: 50 }}
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
          <Text style={Styles.confirmTotalsScreen.container.text.restaurantName}>Missing fees?</Text>
          <View style={{ flexDirection: 'row' }}>
            <PrimaryButton
              outerWidth={SCREEN_WIDTH * 0.38}
              innerWidth={SCREEN_WIDTH * 0.36}
            >
              Yes, add fees!
            </PrimaryButton>
            <PrimaryButton
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
