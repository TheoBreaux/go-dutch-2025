import { View, Text, ScrollView, FlatList } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import TotalsInput from '../components/ui/TotalsInput'
import PrimaryButton from '../components/ui/PrimaryButton'
import CircularButton from '../components/ui/CircularButton'
import { useState } from 'react'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import { useSelector } from 'react-redux'
import { scaleFont } from '../utils/utils'

//make TOTALS A FLATLIS SO I CAN ADD TO IT FEES

const ConfirmTotalsScreen = ({ route }) => {
  const restaurantName = useSelector((state) => state.app.receiptData.restaurantName)

  const { totals, dinersWithTotals } = route.params

  const [finalSubtotal, setFinalSubtotal] = useState(totals.subtotal)
  const [subtotalInputText, setSubtotalInputText] = useState(finalSubtotal.toFixed(2))
  const [finalTax, setFinalTax] = useState(totals.tax)
  const [taxInputText, setTaxInputText] = useState(finalTax.toFixed(2))
  const [finalTip, setFinalTip] = useState(totals.tip)
  const [tipInputText, setTipInputText] = useState(finalTip.toFixed(2))
  const [additionalFees, setAdditionalFees] = useState(0)

  const grandTotal = finalSubtotal + finalTax + finalTip + additionalFees

  console.log(totals, dinersWithTotals, grandTotal)

  return (
    <LogoScreenWrapper
      opacity={0.2}
      backgroundColor={COLORS.logoScreenBackground}
    >
      {/* <ScrollView contentContainerStyle={Styles.confirmTotalsScreen.container}> */}
      <Text style={Styles.confirmTotalsScreen.container.text.restaurantName}>{restaurantName}</Text>
      <FlatList contentContainerStyle={Styles.confirmTotalsScreen.container} />

      <TotalsInput
        onPress={() => setSubtotalInputText(0)}
        onChangeText={(text) => {
          setSubtotalInputText(text)

          const parsed = parseFloat(text)
          if (!isNaN(parsed)) {
            setFinalSubtotal(parsed)
          }
        }}
        value={subtotalInputText}
      >
        $ Subtotal
      </TotalsInput>

      <TotalsInput
        onPress={() => setTaxInputText(0)}
        onChangeText={(text) => {
          setTaxInputText(text)

          const parsed = parseFloat(text)
          if (!isNaN(parsed)) {
            setFinalTax(parsed)
          }
        }}
        value={taxInputText}
      >
        $ Tax
      </TotalsInput>

      <TotalsInput
        value={tipInputText}
        onPress={() => setTipInputText(0)}
        onChangeText={(text) => {
          setTipInputText(text)

          const parsed = parseFloat(text)
          if (!isNaN(parsed)) {
            setFinalTip(parsed)
          }
        }}
      >
        $ Tip
      </TotalsInput>

      <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer}>
        <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButton}>
          <CircularButton
            onPress={() => {
              const tipAmount = (finalSubtotal * 0.18).toFixed(2)
              setTipInputText(tipAmount)
              setFinalTip(parseFloat(tipAmount))
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
              setTipInputText(tipAmount)
              setFinalTip(parseFloat(tipAmount))
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
              setTipInputText(tipAmount)
              setFinalTip(parseFloat(tipAmount))
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
      <Text style={{ fontFamily: 'Poppins-BlackItalic', fontSize: scaleFont(28) }}>GRAND TOTAL: ${grandTotal}</Text>
      {/* </ScrollView> */}
    </LogoScreenWrapper>
  )
}

export default ConfirmTotalsScreen
