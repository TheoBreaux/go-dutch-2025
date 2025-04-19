import { View, Text, Alert, Image, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import Images from '../assets/images/images'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import DinnerItemDropArea from '../components/DinnerItemDropArea'
import DinnerItem from '../components/ui/DinnerItem'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

const DinnerItemAssignmentScreen = ({ route }) => {
  const { diners } = route.params

  const [receiptItems, setReceiptItems] = useState(useSelector((state) => state.app.receiptData.receiptItems))
  const [finalDiners, setFinalDiners] = useState(diners)
  const [currentDinerIndex, setCurrentDinerIndex] = useState(0)
  const currentDinerId = finalDiners[currentDinerIndex]?.userId

  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start()
  }, [])

  const toggleSharedItem = (item) => {
    if (!item.isShared) {
      Alert.alert('Split this with your crew? 🍱', `Are you sure you want to share "${item.name} with all diners"?`, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Share',
          onPress: () => {
            setReceiptItems((prev) => prev.map((receiptItem) => (receiptItem.id === item.id ? { ...receiptItem, isShared: true } : receiptItem)))
          },
        },
      ])
    } else {
      setReceiptItems((prev) => prev.map((receiptItem) => (receiptItem.id === item.id ? { ...receiptItem, isShared: false } : receiptItem)))
    }
  }

  const handleDrop = (item, dinerId) => {
    // Remove item from receiptItems
    setReceiptItems((prev) => prev.filter((receiptItem) => receiptItem.id !== item.id))

    // Assign to diner
    setFinalDiners((prev) => prev.map((diner) => (diner.userId === dinerId ? { ...diner, items: [...(diner.items || []), item] } : diner)))
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SCREEN_HEIGHT * 0.025 }}
      >
        <DinnerItemDropArea
          finalDiners={finalDiners}
          currentDinerIndex={currentDinerIndex}
          receiptItems={receiptItems}
          setReceiptItems={setReceiptItems}
          setFinalDiners={setFinalDiners}
          setCurrentDinerIndex={setCurrentDinerIndex}
        />

        {receiptItems.filter((item) => !item.isShared).length ? (
          // Show assignable items
          receiptItems
            .filter((item) => !item.isShared)
            .map((item) => (
              <DinnerItem
                {...item}
                key={item.id}
                onToggle={() => toggleSharedItem(item)}
                onDrop={(item) => handleDrop(item, currentDinerId)}
              />
            ))
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={Images.up_arrow} />
              <Image source={Images.up_arrow} />
              <Image source={Images.up_arrow} />
            </View>

            <TouchableOpacity>
              <Animated.Text style={[Styles.dinnerItemAssignmentScreen.reviewStamp, { opacity }]}>REVIEW!</Animated.Text>
            </TouchableOpacity>

            <Text style={[Styles.dinnerItemAssignmentScreen.container.text.instruction, { marginTop: SCREEN_HEIGHT * 0.025, fontSize: 22 }]}>
              Please review items for final diner.
            </Text>
          </View>
        )}
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default DinnerItemAssignmentScreen
