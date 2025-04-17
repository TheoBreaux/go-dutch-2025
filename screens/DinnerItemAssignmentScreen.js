import { View, Text, FlatList, Alert, TouchableOpacity, Image, ScrollView } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import Images from '../assets/images/images'
import { COLORS } from '../constants/constants'
import DinnerItemDropArea from '../components/DinnerItemDropArea'
import DinnerItem from '../components/ui/DinnerItem'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const DinnerItemAssignmentScreen = ({ route }) => {
  const [receiptItems, setReceiptItems] = useState(useSelector((state) => state.app.receiptData.receiptItems))
  const [assignmentComplete, setAssigmentComplete] = useState(false)

  const { diners, selectedCelebrants } = route.params
  const finalDiner = diners[diners.length - 1].username

  // const dinnerListRef = useRef(null)

  // const scrollToBottom = () => {
  //   dinnerListRef.current?.scrollToOffset({ offset: 140, animated: true })
  // }

  // const scrollToTop = () => {
  //   dinnerListRef.current?.scrollToOffset({ offset: 0, animated: true })
  // }

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

      <View style={{}}>
        {/* <View style={Styles.dinnerItemAssignmentScreen.container.scrollButtonsContainer}>
          <TouchableOpacity
            onPress={scrollToBottom}
            style={Styles.dinnerItemAssignmentScreen.container.scrollButtonsContainer.button}
          >
            <Text style={Styles.dinnerItemAssignmentScreen.container.scrollButtonsContainer.text}>Scroll to Bottom</Text>
            <Icon
              name="arrow-down"
              size={18}
              color={COLORS.goDutchBlue}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={scrollToTop}
            style={Styles.dinnerItemAssignmentScreen.container.scrollButtonsContainer.button}
          >
            <Icon
              name="arrow-up"
              size={18}
              color={COLORS.goDutchBlue}
            />
            <Text style={Styles.dinnerItemAssignmentScreen.container.scrollButtonsContainer.text}>Scroll to Top</Text>
          </TouchableOpacity>
        </View> */}

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
              <View>
                <DinnerItem
                  {...item}
                  key={item.id}
                  onToggle={() => toggleSharedItem(item)}
                />
              </View>
            )
          })
          // <FlatList
          //   ref={flatListRef}
          //   data={receiptItems.filter((item) => !item.isShared)}
          //   renderItem={renderItem}
          //   showsVerticalScrollIndicator={false}
          //   contentContainerStyle={Styles.dinnerItemAssignmentScreen.container.flatList}
          // />
        )}
      </View>
    </LogoScreenWrapper>
  )
}

export default DinnerItemAssignmentScreen
