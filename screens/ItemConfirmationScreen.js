import { View, FlatList, Platform, Text } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import ConfirmableDinnerItemTile from '../components/ui/ConfirmableDinnerItemTile'
import ItemConfirmationScreenHeader from '../components/ui/ItemConfirmationScreenHeader'
import { useState } from 'react'
import AddDinnerItemModal from '../components/ui/AddDinnerItemModal'
import { nanoid } from 'nanoid/non-secure'
import { DUMMY_RECEIPT_EVENT_DATA } from '../constants/data'

const ItemConfirmationScreen = ({ route }) => {
  // const { eventData } = route.params

  const items = DUMMY_RECEIPT_EVENT_DATA.items.map((item) => ({ id: item.id, name: item.description, price: item.total }))

  const [addingNewItem, setAddingNewItem] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState(0)
  const [receiptData, setreceiptData] = useState(items)
  const [subtotal, setSubtotal] = useState(DUMMY_RECEIPT_EVENT_DATA.subtotal)

  const removeItem = (itemId) => {
    const updatedItems = receiptData.filter((item) => item.id !== itemId)
    const removedItem = receiptData.filter((item) => item.id === itemId)
    console.log('REMOVED ITEM: ', removedItem)
    setreceiptData(updatedItems)
    setSubtotal((prevSubtotal) => prevSubtotal - Number(removedItem[0].price))
  }

  const addItem = () => {
    //check if trying to submmit with no new data and if so return to screen
    if (newItemName === '' || newItemPrice === '') {
      //reset inputs
      setNewItemName('')
      setNewItemPrice('')
      setAddingNewItem(false)
      return
    }

    const newItem = {
      name: newItemName,
      price: parseFloat(newItemPrice),
      id: nanoid(10),
    }

    // Add the new item to the existing array
    const updatedItems = [...receiptData, newItem]
    // Recalculate the subtotal after adding the new item
    const newSubtotal = updatedItems.reduce((total, item) => total + item.price, 0)

    // Add the new item to the existing array
    setreceiptData(updatedItems)
    setSubtotal(newSubtotal)

    //reset inputs
    setNewItemName('')
    setNewItemPrice('')
    // Close the modal
    setAddingNewItem(false)
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
          addItem={addItem}
        />
      )}
      <View style={{ marginBottom: SCREEN_HEIGHT * 0.025 }}>
        <ItemConfirmationScreenHeader
          {...DUMMY_RECEIPT_EVENT_DATA}
          subtotal={subtotal}
          setAddingNewItem={setAddingNewItem}
          receiptData={receiptData}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={receiptData}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.075 : SCREEN_HEIGHT * 0.05 }}
      />
    </LogoScreenWrapper>
  )
}

export default ItemConfirmationScreen
