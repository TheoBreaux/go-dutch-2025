import { useState } from 'react'
import { Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import PrimaryButton from '../components/ui/PrimaryButton'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'

const SPLIT_PACKAGES = [
  { id: '1', count: 1, price: 0.99 },
  { id: '5', count: 5, price: 1.99 },
  { id: '10', count: 10, price: 2.99 },
  { id: '25', count: 25, price: 4.99 },
]

const SplitPurchaseScreen = () => {
  const [selectedPackageId, setSelectedPackageId] = useState('5')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const selected = SPLIT_PACKAGES.find((p) => p.id === selectedPackageId)

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <Text style={Styles.splitPurchaseScreen.heading}>Buy Split Purchases</Text>
      <ScrollView
        contentContainerStyle={Styles.splitPurchaseScreen.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={Styles.splitPurchaseScreen.title}>Select a package:</Text>

        {SPLIT_PACKAGES.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            onPress={() => setSelectedPackageId(pkg.id)}
            style={[Styles.splitPurchaseScreen.priceCard, { borderColor: selectedPackageId === pkg.id ? COLORS.goDutchRed : '#ccc' }]}
          >
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-ExtraBold' }}>
              {pkg.count} splits - ${pkg.price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={Styles.splitPurchaseScreen.title}>Payment Info:</Text>

        <Text style={[Styles.signUpScreen.inputLabels, { alignSelf: 'flex-start', paddingHorizontal: SCREEN_WIDTH * 0.025 }]}>Card Number</Text>
        <TextInput
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
          style={[Styles.signUpScreen.textInput, { width: SCREEN_WIDTH * 0.9, marginBottom: SCREEN_HEIGHT * 0.01 }]}
        />
        <Text style={[Styles.signUpScreen.inputLabels, { alignSelf: 'flex-start', paddingHorizontal: SCREEN_WIDTH * 0.025 }]}>Expiry (MM/YY)</Text>
        <TextInput
          value={expiry}
          onChangeText={setExpiry}
          keyboardType="number-pad"
          style={[Styles.signUpScreen.textInput, { width: SCREEN_WIDTH * 0.9, marginBottom: SCREEN_HEIGHT * 0.01 }]}
        />
        <Text style={[Styles.signUpScreen.inputLabels, { alignSelf: 'flex-start', paddingHorizontal: SCREEN_WIDTH * 0.025 }]}>CVC</Text>
        <TextInput
          value={cvc}
          onChangeText={setCvc}
          keyboardType="number-pad"
          style={[Styles.signUpScreen.textInput, { width: SCREEN_WIDTH * 0.9, marginBottom: SCREEN_HEIGHT * 0.01 }]}
        />

        <PrimaryButton
          outerWidth={SCREEN_WIDTH * 0.9}
          innerWidth={SCREEN_WIDTH * 0.88}
        >
          Buy {selected?.count} Splits – ${selected?.price.toFixed(2)}
        </PrimaryButton>

        <Text style={Styles.splitPurchaseScreen.disclaimer}>Splits do not expire. All purchases are final.</Text>
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default SplitPurchaseScreen
