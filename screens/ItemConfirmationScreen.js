import { View, FlatList, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import { useSelector } from 'react-redux'
import ConfirmableDinnerItemTile from '../components/ui/ConfirmableDinnerItemTile'
import ItemConfirmationScreenHeader from '../components/ui/ItemConfirmationScreenHeader'
import { useState } from 'react'

const ItemConfirmationScreen = ({ route }) => {
  const { eventData } = route.params
  const items = eventData.items.map((item) => ({ id: item.id, name: item.description, price: item.total }))

  const [newItemName, setNewItemName] = useState(null)
  const [newItemPrice, setNewItemPrice] = useState(null)
  const [receiptItems, setReceiptItems] = useState(items)
  const [subtotal, setSubtotal] = useState(eventData.subtotal)

  console.log('RECEIPT ITEMS BEFORE: ', receiptItems)

  const removeItem = (itemId) => {
    const updatedItems = receiptItems.filter((item) => item.id !== itemId)
    setReceiptItems(updatedItems)
  }

  console.log('RECEIPT ITEMS AFTER: ', receiptItems)

  const addItem = () => {}

  const renderItem = ({ item }) => (
    <ConfirmableDinnerItemTile
      {...item}
      removeItem={removeItem}
    />
  )

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={{ marginBottom: SCREEN_HEIGHT * 0.025 }}>
        <ItemConfirmationScreenHeader
          subtotal={eventData.subtotal}
          restaurantName={eventData.restaurantName}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={receiptItems}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.075 : SCREEN_HEIGHT * 0.05 }}
      />
    </LogoScreenWrapper>
  )
}

export default ItemConfirmationScreen
