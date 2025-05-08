import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { SCREEN_WIDTH, SCREEN_HEIGHT, COLORS } from '../../constants/constants'
import PrimaryButton from './PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import { scaleFont } from '../../utils/utils'

const DiningDetailsModal = ({ diningEvent, onClose, showDiningDetailsModal, setShowDiningDetailsModal }) => {
  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer, { width: SCREEN_WIDTH * 0.8 }]}
      onPress={() => {
        setShowDiningDetailsModal(false)
        navigation.navigate('Screens', { screen: 'Profile', params: { item } })
      }}
    >
      <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.username}>
        @{item.username}
        {item.isPrimaryDiner && (
          <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.primaryDinerText}>$PRIMARY DINER</Text>
        )}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.total}>${parseFloat(item.dinerMealCost).toFixed(2)}</Text>
        {item.isCelebrating && (
          <Image
            source={Images.celebration_emoji}
            style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.emoji}
          />
        )}
      </View>
    </TouchableOpacity>
  )

  const totalMealCost = diningEvent.diners.reduce((sum, diner) => sum + diner.dinerMealCost, 0)

  return (
    <CustomModalContainer
      buttons={false}
      animationType="fade"
      visible={showDiningDetailsModal}
    >
      <View style={Styles.diningDetailsModal.container}>
        <Image
          source={Images.go_dutch_split_button}
          style={Styles.diningDetailsModal.container.image}
        />
        <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.eventTitle}>{diningEvent.eventLocation}</Text>
        <Text
          style={[
            Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.eventTitle,
            { marginTop: -SCREEN_HEIGHT * 0.025, color: COLORS.goDutchRed, fontFamily: 'Poppins-BlackItalic' },
          ]}
        >
          {diningEvent.eventTitle}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={diningEvent.diners}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.015 }}
        />
        <Text style={[Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.thankYou, { fontSize: scaleFont(20) }]}>
          Total Meal Cost: ${totalMealCost}
        </Text>
        <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.thankYou}>Thanks for going Dutch! 🎉</Text>
        <PrimaryButton onPress={onClose}>Close</PrimaryButton>
      </View>
    </CustomModalContainer>
  )
}

export default DiningDetailsModal
