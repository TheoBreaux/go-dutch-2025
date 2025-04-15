import { View, Text, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import Images from '../assets/images/images'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { formatReceiptDate } from '../utils/utils'

const DiningDetailScreen = ({ navigation }) => {
  const eventData = useSelector((state) => state.app.receiptData)

  const [eventDate, setEventDate] = useState(eventData.date)
  const [eventLocation, setEventLocation] = useState(eventData.restaurantName)
  const [eventTitle, setEventTitle] = useState('')
  const [primaryDiner, setPrimaryDiner] = useState('') //this will eventually be searchable through database

  const handleConfirmDetails = () => {
    if (eventDate === '' || eventLocation === '' || eventTitle === '' || primaryDiner === '') return

    navigation.navigate('Screens', { screen: 'DinerInput', params: { primaryDiner, eventTitle, eventLocation } })
  }

  return (
    <LogoScreenWrapper
      backgroundColor={COLORS.logoScreenBackground}
      useLogo={false}
    >
      <Image
        source={Images.dining_detail}
        style={Style.diningDetailsScreen.image}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={Style.diningDetailsScreen.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={Style.diningDetailsScreen.container.heading}>Confirm dining details:</Text>

          <View>
            <Text style={[Style.diningDetailsScreen.container.label, { marginTop: 5 }]}>Primary Diner:</Text>
            <TextInput
              style={Style.profileScreen.inputContainer.textInput}
              value={primaryDiner}
              onChangeText={setPrimaryDiner}
            />
          </View>

          <View>
            <Text style={Style.diningDetailsScreen.container.label}>Date:</Text>
            <TextInput
              style={Style.profileScreen.inputContainer.textInput}
              placeholder="09/24/2025"
              value={formatReceiptDate(eventDate)}
              onChangeText={setEventDate}
            />
          </View>

          <View>
            <Text style={[Style.diningDetailsScreen.container.label, { marginTop: 5 }]}>Restaurant/Bar:</Text>
            <TextInput
              style={Style.profileScreen.inputContainer.textInput}
              placeholder="Outback Steakhouse"
              value={eventLocation}
              onChangeText={setEventLocation}
            />
          </View>

          <View>
            <Text style={[Style.diningDetailsScreen.container.label, { marginTop: 5 }]}>Event Title:</Text>
            <TextInput
              style={Style.profileScreen.inputContainer.textInput}
              value={eventTitle}
              onChangeText={setEventTitle}
            />
          </View>

          <View style={{ alignSelf: 'center' }}>
            <PrimaryButton
              onPress={handleConfirmDetails}
              outterWidth={SCREEN_WIDTH * 0.75}
              innerWidth={SCREEN_WIDTH * 0.72}
            >
              Confirm Details
            </PrimaryButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default DiningDetailScreen
