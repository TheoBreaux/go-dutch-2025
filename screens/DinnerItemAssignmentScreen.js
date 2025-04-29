import { View, Text, Alert, Image, ScrollView, TouchableOpacity, Animated, Easing, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import Images from '../assets/images/images'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import DinnerItemDropArea from '../components/DinnerItemDropArea'
import DinnerItem from '../components/ui/DinnerItem'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { scaleFont } from '../utils/utils'

const DinnerItemAssignmentScreen = ({ route }) => {
  const Container = Platform.OS === 'ios' ? View : ScrollView

  const { diners, eventTitle } = route.params

  const [receiptItems, setReceiptItems] = useState(useSelector((state) => state.app.receiptData.receiptItems))
  const [finalDiners, setFinalDiners] = useState(diners)
  const [currentDinerIndex, setCurrentDinerIndex] = useState(0)
  const [sharedItems, setSharedItems] = useState([])
  const currentDinerId = finalDiners[currentDinerIndex]?.userId

  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 7000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 7000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start()
  }, [])

  const toggleSharedItem = (item) => {
    if (!item.isShared) {
      // Optimistically update state
      setReceiptItems((prev) => prev.map((receiptItem) => (receiptItem.id === item.id ? { ...receiptItem, isShared: true } : receiptItem)))

      Alert.alert('Split this with your crew? 🍱', `Are you sure you want to share "${item.name}" with all diners?`, [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            // Revert the optimistic update
            setReceiptItems((prev) => prev.map((receiptItem) => (receiptItem.id === item.id ? { ...receiptItem, isShared: false } : receiptItem)))
          },
        },
        {
          text: 'Share',
          onPress: () => {
            setReceiptItems((prev) => prev.filter((i) => i.id !== item.id))
            setSharedItems((prev) => [...prev, { ...item, isShared: true }])
          },
        },
      ])
    } else {
      // Unsharing item: move it back to receiptItems
      setSharedItems((prev) => prev.filter((i) => i.id !== item.id))
      setReceiptItems((prev) => [...prev, { ...item, isShared: false }])
    }
  }

  const handleDrop = (item, dinerId) => {
    //confirm the item is assigned to a diner
    if (!dinerId) {
      console.warn('handleDrop: No dinerId provided for item:', item)
      return
    }

    // Remove item from receiptItems
    setReceiptItems((prev) => prev.filter((receiptItem) => receiptItem.id !== item.id))

    // Assign to diner
    setFinalDiners((prev) => prev.map((diner) => (diner.userId === dinerId ? { ...diner, items: [...(diner.items || []), item] } : diner)))
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <Container
        style={{ marginBottom: SCREEN_HEIGHT * 0.025 }}
        {...(Platform.OS === 'android' ? { showsVerticalScrollIndicator: false } : {})}
      >
        <DinnerItemDropArea
          finalDiners={finalDiners}
          currentDinerIndex={currentDinerIndex}
          receiptItems={receiptItems}
          setReceiptItems={setReceiptItems}
          setFinalDiners={setFinalDiners}
          setCurrentDinerIndex={setCurrentDinerIndex}
          sharedItems={sharedItems}
          eventTitle={eventTitle}
        />

        {receiptItems.filter((item) => !item.isShared).length ? (
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

            <Text
              style={[Styles.dinnerItemAssignmentScreen.container.text.instruction, { marginTop: SCREEN_HEIGHT * 0.025, fontSize: scaleFont(20) }]}
            >
              Please review items for final diner.
            </Text>
          </View>
        )}
      </Container>
    </LogoScreenWrapper>
  )
}

export default DinnerItemAssignmentScreen
