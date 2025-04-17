import { View, Text, FlatList } from 'react-native'
import CelebratedDinerSwitch from './CelebratedDinerSwitch'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import { SCREEN_HEIGHT } from '../../constants/constants'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const CelebrationSelectionModal = ({ diners, setShowSelectionModal, setShowCelebrationModal }) => {
  const [selectedCelebrants, setSelectedCelebrants] = useState([])

  const navigation = useNavigation()

  const toggleCelebrant = (diner) => {
    setSelectedCelebrants((prev) => {
      const exists = prev.find((d) => d.username === diner.username)

      if (exists) {
        // Remove if already selected
        return prev.filter((d) => d.username !== diner.username)
      } else {
        // Add full diner object
        return [...prev, { ...diner, isCelebrating: true }]
      }
    })
  }

  const renderItem = ({ item }) => (
    <CelebratedDinerSwitch
      {...item}
      isChecked={selectedCelebrants.some((d) => d.username === item.username)}
      onToggle={() => toggleCelebrant(item)}
    />
  )

  const handleConfirm = () => {
    setShowCelebrationModal(false)
    setShowSelectionModal(false)
    navigation.navigate('Screens', { screen: 'ItemAssignment', params: { diners, selectedCelebrants } })
  }

  return (
    <CustomModalContainer
      animationType="fade"
      buttonText1="Return"
      buttonText2="Confirm"
      onPress1={() => setShowSelectionModal(false)}
      onPress2={handleConfirm}
    >
      <View style={{ marginTop: SCREEN_HEIGHT * 0.05, marginBottom: SCREEN_HEIGHT * 0.015 }}>
        <Text style={Styles.customModalContainer.text}>Select who we're celebrating!</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={diners}
        renderItem={renderItem}
      />
    </CustomModalContainer>
  )
}

export default CelebrationSelectionModal
