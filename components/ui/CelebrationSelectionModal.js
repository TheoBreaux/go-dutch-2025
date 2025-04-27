import { View, Text, FlatList } from 'react-native'
import CelebratedDinerSwitch from './CelebratedDinerSwitch'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import { SCREEN_HEIGHT } from '../../constants/constants'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const CelebrationSelectionModal = ({ diners, setShowSelectionModal, setShowCelebrationModal, eventTitle }) => {
  const [updatedDiners, setUpdatedDiners] = useState(diners.map((diner) => ({ ...diner, isCelebrating: false })))

  const navigation = useNavigation()

  const toggleCelebrationStatus = (dinerId) => {
    setUpdatedDiners((prev) => prev.map((diner) => (diner.userId === dinerId ? { ...diner, isCelebrating: !diner.isCelebrating } : diner)))
  }

  const renderItem = ({ item }) => (
    <CelebratedDinerSwitch
      {...item}
      isChecked={item.isCelebrating}
      onToggle={() => toggleCelebrationStatus(item.userId)}
    />
  )

  const handleConfirm = () => {
    setShowCelebrationModal(false)
    setShowSelectionModal(false)
    navigation.navigate('Screens', { screen: 'ItemAssignment', params: { diners: updatedDiners, eventTitle } })
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
        data={updatedDiners}
        renderItem={renderItem}
      />
    </CustomModalContainer>
  )
}

export default CelebrationSelectionModal
