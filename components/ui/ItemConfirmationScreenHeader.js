import { View, Text } from 'react-native'
import Styles from '../../style'
import Entypo from '@expo/vector-icons/Entypo'
import { COLORS } from '../../constants/constants'
import CircularButton from './CircularButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setReceiptDataSuccess } from '../../state/actions/actions'

const ItemConfirmationScreenHeader = ({ subtotal, restaurantName, setAddingNewItem, receiptData, address, eventId, total, tax, date }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleItemAssigment = () => {
    dispatch(setReceiptDataSuccess({ restaurantName, eventId, address, receiptData, subtotal, total, tax, date }))
    navigation.navigate('Screens', { screen: 'DiningDetail' })
  }

  return (
    <View style={Styles.itemConfirmationScreen.modalContainer}>
      <Text style={Styles.itemConfirmationScreen.modalContainer.text.name}>{restaurantName}</Text>
      <Text style={Styles.itemConfirmationScreen.modalContainer.text.confirm}>Confirm or add any missing items!</Text>
      <View style={Styles.itemConfirmationScreen.modalContainer.buttonContainer}>
        <View style={{ marginHorizontal: 15 }}>
          <CircularButton
            onPress={handleItemAssigment}
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
            onPress={() => setAddingNewItem(true)}
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
  )
}

export default ItemConfirmationScreenHeader
