import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import LottieView from 'lottie-react-native'
import Styles from '../style'
import Images from '../assets/images/images'
import PrimaryButton from '../components/ui/PrimaryButton'
import SpinningLogo from '../components/ui/SpinningLogo'

const CheckCloseOutDetailsScreen = ({ route, navigation }) => {
  const [viewReceipt, setViewReceipt] = useState(false)

  const state = useSelector((state) => state.app)
  const eventLocation = state.receiptData.restaurantName
  const { finalBill } = route.params

  const renderItem = ({ item }) => (
    <TouchableOpacity style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer}>
      <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.username}>
        @{item.username}
        {item.isPrimaryDiner && (
          <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.primaryDinerText}>$PRIMARY DINER</Text>
        )}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.total}>${parseFloat(item.total).toFixed(2)}</Text>
        {item.isCelebrating && (
          <Image
            source={Images.celebration_emoji}
            style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.emoji}
          />
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <LottieView
        source={require('../assets/confetti-animation.json')}
        style={Styles.checkCloseOutDetailsScreen.confettiView}
        autoPlay={true}
        loop={false}
        resizeMode="cover"
      />

      {viewReceipt ? (
        <>
          <View style={Styles.checkCloseOutDetailsScreen.receiptContainer}>
            <Image
              style={Styles.checkCloseOutDetailsScreen.receiptContainer.image}
              source={Images.dummy_receipt}
            />
          </View>
          <View style={{ marginBottom: -10 }}>
            <PrimaryButton
              onPress={() => navigation.navigate('Tabs', { screen: 'History' })}
              outerWidth={SCREEN_WIDTH * 0.85}
              innerWidth={SCREEN_WIDTH * 0.83}
            >
              Return to History
            </PrimaryButton>
          </View>
        </>
      ) : (
        <SpinningLogo marginTop={0} />
      )}

      {!viewReceipt && (
        <View style={{ flexDirection: 'row' }}>
          <PrimaryButton
            onPress={() => setViewReceipt(true)}
            outerWidth={SCREEN_WIDTH * 0.4}
            innerWidth={SCREEN_WIDTH * 0.38}
          >
            View Receipt
          </PrimaryButton>
          <PrimaryButton
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
            outerWidth={SCREEN_WIDTH * 0.4}
            innerWidth={SCREEN_WIDTH * 0.38}
          >
            Home
          </PrimaryButton>
        </View>
      )}

      <View style={Styles.checkCloseOutDetailsScreen.header}>
        <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.eventTitle}>{eventLocation}</Text>
        <Text style={[Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.eventTitle, { color: COLORS.goDutchRed }]}>Diners</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={finalBill}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.015 }}
      />
      <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.thankYou}>Thanks for going Dutch! 🎉</Text>
    </LogoScreenWrapper>
  )
}

export default CheckCloseOutDetailsScreen
