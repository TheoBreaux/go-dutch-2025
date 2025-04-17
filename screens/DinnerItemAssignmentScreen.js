import { View, Text, Alert, Image } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import Images from '../assets/images/images'
import { COLORS } from '../constants/constants'
import DinnerItemDropArea from '../components/DinnerItemDropArea'
import DinnerItem from '../components/ui/DinnerItem'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const DinnerItemAssignmentScreen = ({ route }) => {
  const [receiptItems, setReceiptItems] = useState(useSelector((state) => state.app.receiptData.receiptItems))
  const [assignmentComplete, setAssigmentComplete] = useState(false)

  const { diners, selectedCelebrants } = route.params
  const finalDiner = diners[diners.length - 1].username

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

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <DinnerItemDropArea
        diners={diners}
        selectedCelebrants={selectedCelebrants}
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
        receiptItems.map((item) => {
          return (
            <DinnerItem
              {...item}
              key={item.id}
              onToggle={() => toggleSharedItem(item)}
            />
          )
        })
      )}
    </LogoScreenWrapper>
  )
}

export default DinnerItemAssignmentScreen
