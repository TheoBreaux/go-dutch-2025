import { View, FlatList, Platform, Text } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import ConfirmableDinnerItemTile from '../components/ui/ConfirmableDinnerItemTile'
import ItemConfirmationScreenHeader from '../components/ui/ItemConfirmationScreenHeader'
import { useState } from 'react'
import AddDinnerItemModal from '../components/ui/AddDinnerItemModal'

const ItemConfirmationScreen = ({ route }) => {
  const { eventData } = route.params
  const items = eventData.items.map((item) => ({ id: item.id, name: item.description, price: item.total }))
  const [addingNewItem, setAddingNewItem] = useState(false)
  const [newItemName, setNewItemName] = useState(null)
  const [newItemPrice, setNewItemPrice] = useState(null)
  const [receiptItems, setReceiptItems] = useState(items)
  const [subtotal, setSubtotal] = useState(eventData.subtotal)

  const removeItem = (itemId) => {
    const updatedItems = receiptItems.filter((item) => item.id !== itemId)
    const removedItem = receiptItems.filter((item) => item.id === itemId)
    console.log('REMOVED ITEM: ', removedItem)
    setReceiptItems(updatedItems)
    setSubtotal((prevSubtotal) => prevSubtotal - Number(removedItem[0].price))
  }

  const addItem = () => {
    if (newItemName === '' || newItemPrice === '') {
      return setShowAddItemsModal(false)
    }

    const newItem = {
      name: newItemName,
      price: parseFloat(newItemPrice),
      id: nanoid(8),
    }

    // Add the new item to the existing array
    const updatedItems = [...separatedDinnerItems, newItem]

    // Recalculate the subtotal after adding the new item
    const newSubtotal = updatedItems.reduce((total, item) => total + item.price, 0)

    // Add the new item to the existing array
    setSeparatedDinnerItems((prevItems) => [...prevItems, newItem])
    setSubtotal(newSubtotal)

    // Optionally, you can reset the input fields
    setNewItemName('')
    setNewItemPrice('')

    // Close the modal
    setShowAddItemsModal(false)
  }

  const renderItem = ({ item }) => (
    <ConfirmableDinnerItemTile
      {...item}
      removeItem={removeItem}
    />
  )

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      {addingNewItem && (
        <AddDinnerItemModal
          setNewItemName={setNewItemName}
          setNewItemPrice={setNewItemPrice}
          newItemName={newItemName}
          newItemPrice={newItemPrice}
          setAddingNewItem={setAddingNewItem}
        />
      )}
      <View style={{ marginBottom: SCREEN_HEIGHT * 0.025 }}>
        <ItemConfirmationScreenHeader
          subtotal={subtotal}
          restaurantName={eventData.restaurantName}
          setAddingNewItem={setAddingNewItem}
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
