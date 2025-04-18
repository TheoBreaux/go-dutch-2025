import { View, Text, Alert, Image, ScrollView } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import Images from '../assets/images/images'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import DinnerItemDropArea from '../components/DinnerItemDropArea'
import DinnerItem from '../components/ui/DinnerItem'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const DinnerItemAssignmentScreen = ({ route }) => {
  const { updatedDiners } = route.params

  const [receiptItems, setReceiptItems] = useState(useSelector((state) => state.app.receiptData.receiptItems))
  const [assignmentComplete, setAssigmentComplete] = useState(false)
  const [finalDiners, setFinalDiners] = useState(updatedDiners)

  const [currentDinerIndex, setCurrentDinerIndex] = useState(0)
  const [currentDinerId, setCurrentDinerId] = useState(finalDiners[currentDinerIndex].userId)

  const finalDinerId = updatedDiners[updatedDiners.length - 1].userId
  //BE SURE TO ALSO CONFIRM SHARED ITEMS AT AFTER LAST DINER ITEMS ARE CONFIRMED POSSIBLY

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
        />

        {assignmentComplete ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={Images.up_arrow} />
              <Image source={Images.up_arrow} />
              <Image source={Images.up_arrow} />
            </View>

            <Text
              style={{
                marginTop: 10,
                letterSpacing: 5,
                fontFamily: 'Poppins-BlackItalic',
                color: COLORS.goDutchRed,
                fontSize: 55,
                textAlign: 'center',
                borderWidth: 5,
                elevation: 5,
                backgroundColor: 'white',
                padding: 15,
                borderColor: COLORS.goDutchRed,
              }}
            >
              REVIEW!
            </Text>
            <Text style={{ fontFamily: 'red-hat-normal', fontSize: 20, marginTop: 10, textAlign: 'center' }}>
              Please review the final bill for <Text style={{ fontFamily: 'red-hat-bold' }}>@{finalDiner}</Text>
            </Text>
          </View>
        ) : (
          receiptItems
            .filter((item) => !item.isShared) // 👈 only show items that are not shared
            .map((item) => {
              return (
                <DinnerItem
                  {...item}
                  key={item.id}
                  onToggle={() => toggleSharedItem(item)}
                  onDrop={(item) => handleDrop(item, currentDinerId)}
                />
              )
            })
        )}
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default DinnerItemAssignmentScreen
