import { View, Text, FlatList } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import CircularButton from '../components/ui/CircularButton'
import Entypo from '@expo/vector-icons/Entypo'
import { COLORS } from '../constants/constants'
import { useSelector } from 'react-redux'

const ItemConfirmationScreen = () => {
  const receiptData = useSelector((state) => state.app.receiptData)

  const date = receiptData.date
  const items = receiptData.line_items
  const subtotal = receiptData.subtotal
  const tax = receiptData.tax
  const vendor = receiptData.vendor
  const restaurantName = receiptData.vendor.name
  const restaurantAddress = receiptData.vendor.address

  console.log(date)
  console.log(items)
  console.log(subtotal)
  console.log(tax)
  console.log(vendor)
  console.log(restaurantName)
  console.log(restaurantAddress)

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={Styles.itemConfirmationScreen.modalContainer}>
        <Text style={Styles.itemConfirmationScreen.modalContainer.text.name}>{restaurantName}</Text>
        <Text style={Styles.itemConfirmationScreen.modalContainer.text.confirm}>Confirm or add any missing items!</Text>
        <View style={Styles.itemConfirmationScreen.modalContainer.buttonContainer}>
          <View style={{ marginHorizontal: 15 }}>
            <CircularButton
              icon={
                <Entypo
                  name="check"
                  size={25}
                  color="white"
                />
              }
            />
          </View>
          <View style={{ marginHorizontal: 15 }}>
            <CircularButton
              icon={
                <Entypo
                  name="plus"
                  size={25}
                  color="white"
                />
              }
            />
          </View>
        </View>
        <Text style={Styles.itemConfirmationScreen.modalContainer.text.subtotal}>
          SUBTOTAL: <Text style={{ color: COLORS.goDutchRed }}>${subtotal.toFixed(2)}</Text>
        </Text>
      </View>
      <FlatList />
    </LogoScreenWrapper>
  )
}

export default ItemConfirmationScreen
