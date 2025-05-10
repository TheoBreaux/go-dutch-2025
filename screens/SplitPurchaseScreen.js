import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'

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
    <LogoScreenWrapper
      backgroundColor={COLORS.logoScreenBackground}
      useLogo={false}
    >
      {' '}
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Buy Split Purchases</Text>

        <Text style={{ fontSize: 16, marginBottom: 12 }}>Select a package:</Text>
        {SPLIT_PACKAGES.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            onPress={() => setSelectedPackageId(pkg.id)}
            style={{
              borderColor: selectedPackageId === pkg.id ? '#007bff' : '#ccc',
              borderWidth: 2,
              padding: 16,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{pkg.count} splits</Text>
            <Text style={{ color: '#666' }}>
              ${pkg.price.toFixed(2)} – ${(pkg.price / pkg.count).toFixed(2)} each
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={{ fontSize: 16, marginVertical: 16 }}>Payment Info:</Text>
        <TextInput
          label="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Expiry (MM/YY)"
          value={expiry}
          onChangeText={setExpiry}
          keyboardType="number-pad"
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="CVC"
          value={cvc}
          onChangeText={setCvc}
          keyboardType="number-pad"
          style={{ marginBottom: 24 }}
        />

        <Button
          mode="contained"
          onPress={() => {
            // Trigger payment flow
          }}
        >
          Buy {selected?.count} Splits – ${selected?.price.toFixed(2)}
        </Button>

        <Text style={{ fontSize: 12, color: '#888', marginTop: 16 }}>Splits do not expire. All purchases are final.</Text>
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default SplitPurchaseScreen
