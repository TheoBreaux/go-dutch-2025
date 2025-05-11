import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import PrimaryButton from '../components/ui/PrimaryButton'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'

const SPLIT_PACKAGES = [
  { id: '1', count: 1, price: 0.5 },
  { id: '5', count: 5, price: 2 },
  { id: '10', count: 10, price: 3 },
  { id: '25', count: 25, price: 5 },
]

const SplitPurchaseScreen = () => {
  const [selectedPackageId, setSelectedPackageId] = useState('5')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const selected = SPLIT_PACKAGES.find((p) => p.id === selectedPackageId)

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <Text style={{ fontSize: 30, fontFamily: 'Poppins-BlackItalic', color: COLORS.goDutchRed }}>Buy Split Purchases</Text>
      <ScrollView
        contentContainerStyle={{ padding: 10, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        

        <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', alignSelf: 'flex-start', marginHorizontal: 10 }}>Select a package:</Text>

        {SPLIT_PACKAGES.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            onPress={() => setSelectedPackageId(pkg.id)}
            style={{
              borderColor: selectedPackageId === pkg.id ? COLORS.goDutchRed : '#ccc',
              borderWidth: 2,
              padding: 8,
              borderRadius: 12,
              marginBottom: 10,
              width: SCREEN_WIDTH * 0.9,
              elevation: 5,
              backgroundColor: 'white',
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-ExtraBold' }}>{pkg.count} splits</Text>
            <Text style={{ fontFamily: 'Poppins-ExtraBold' }}>
              ${pkg.price.toFixed(2)} – ${(pkg.price / pkg.count).toFixed(2)} each
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', alignSelf: 'flex-start', paddingHorizontal: 10 }}>Payment Info:</Text>

        <Text style={[Styles.signUpScreen.inputLabels, { alignSelf: 'flex-start', paddingHorizontal: 10 }]}>Card Number</Text>
        <TextInput
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
          style={[Styles.signUpScreen.textInput, { width: SCREEN_WIDTH * 0.9, marginBottom: 5 }]}
        />
        <Text style={[Styles.signUpScreen.inputLabels, { alignSelf: 'flex-start', paddingHorizontal: 10 }]}>Expiry (MM/YY)</Text>
        <TextInput
          value={expiry}
          onChangeText={setExpiry}
          keyboardType="number-pad"
          style={[Styles.signUpScreen.textInput, { width: SCREEN_WIDTH * 0.9, marginBottom: 5 }]}
        />
        <Text style={[Styles.signUpScreen.inputLabels, { alignSelf: 'flex-start', paddingHorizontal: 10 }]}>CVC</Text>
        <TextInput
          value={cvc}
          onChangeText={setCvc}
          keyboardType="number-pad"
          style={[Styles.signUpScreen.textInput, { width: SCREEN_WIDTH * 0.9, marginBottom: 5 }]}
        />

        <PrimaryButton
          outerWidth={SCREEN_WIDTH * 0.9}
          innerWidth={SCREEN_WIDTH * 0.88}
        >
          Buy {selected?.count} Splits – ${selected?.price.toFixed(2)}
        </PrimaryButton>

        <Text style={{ fontSize: 12, color: '#888', marginBottom: 20 }}>Splits do not expire. All purchases are final.</Text>
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default SplitPurchaseScreen
