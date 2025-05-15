import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { SCREEN_WIDTH, SCREEN_HEIGHT, COLORS, ASSET_URL } from '../../constants/constants'
import PrimaryButton from './PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import { scaleFont } from '../../utils/utils'
import { useState } from 'react'
import CircularButton from './CircularButton'
import AntDesign from '@expo/vector-icons/AntDesign'

const DiningDetailsModal = ({ diningEvent, onClose, showDiningDetailsModal, setShowDiningDetailsModal }) => {
  const navigation = useNavigation()
  const [showReceipt, setShowReceipt] = useState(false)

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
      <View
        style={{
          borderColor: showReceipt ? COLORS.goDutchRed : null,
          borderWidth: showReceipt ? 10 : null,
        }}
      >
        {showReceipt ? (
          <>
            {diningEvent.imgUrl ? (
              <Image
                source={{ uri: ASSET_URL + diningEvent.imgUrl }}
                style={{ width: SCREEN_WIDTH, height: '100%' }}
              />
            ) : (
              <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.eventTitle}>IMAGE NOT AVAILABLE</Text>
            )}
            <View style={{ position: 'absolute', top: SCREEN_HEIGHT * 0.015, right: SCREEN_WIDTH * 0.075 }}>
              <CircularButton
                onPress={() => {
                  setShowReceipt(false)
                }}
                icon={
                  <AntDesign
                    name="closecircleo"
                    size={30}
                    color="white"
                  />
                }
              />
            </View>
          </>
        ) : (
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
              Total Meal Cost: ${totalMealCost.toFixed(2)}
            </Text>
            <Text style={Styles.checkCloseOutDetailsScreen.finalBillDisplayTileContainer.text.thankYou}>Thanks for going Dutch! 🎉</Text>
            <View style={{ flexDirection: 'row' }}>
              <PrimaryButton onPress={() => setShowReceipt(true)}>View Receipt</PrimaryButton>
              <PrimaryButton onPress={onClose}>Close</PrimaryButton>
            </View>
          </View>
        )}
      </View>
    </CustomModalContainer>
  )
}

export default DiningDetailsModal
