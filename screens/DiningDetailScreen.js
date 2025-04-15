import { View, Text, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import Images from '../assets/images/images'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { formatReceiptDate } from '../utils/utils'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Toast from 'react-native-toast-message'

const DiningDetailScreen = ({ navigation }) => {
  const eventData = useSelector((state) => state.app.receiptData)
  const loggedInUser = useSelector((state) => state.app.user.username)

  const [eventDate, setEventDate] = useState(eventData.date)
  const [eventLocation, setEventLocation] = useState(eventData.restaurantName)
  const [eventTitle, setEventTitle] = useState('')
  const [primaryDiner, setPrimaryDiner] = useState(loggedInUser) //this will eventually be searchable through database

  const handleConfirmDetails = () => {
    let missingFields = {}
  
    if (eventDate === '') {
      missingFields.eventDate = 'Date'
    }
    if (eventLocation === '') {
      missingFields.eventLocation = 'Location'
    }
    if (eventTitle === '') {
      missingFields.eventTitle = 'Title'
    }
    if (primaryDiner === '') {
      missingFields.primaryDiner = 'Primary Diner'
    }
  
    const missingKeys = Object.values(missingFields)
  
    if (missingKeys.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Error 😞',
        text2: `Missing ${missingKeys.join(', ')}.`,
        position: 'top',
        visibilityTime: 3000,
      })
  
      return
    }
  
    navigation.navigate('Screens', {
      screen: 'DinerInput',
      params: { primaryDiner, eventTitle, eventLocation }
    })
  }

  return (
    <LogoScreenWrapper
      backgroundColor={COLORS.logoScreenBackground}
      useLogo={false}
    >
      <Image
        source={Images.dining_detail}
        style={Styles.diningDetailsScreen.image}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={Styles.diningDetailsScreen.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={Styles.diningDetailsScreen.container.heading}>Confirm dining details:</Text>

          <Text style={[Styles.diningDetailsScreen.container.label, { marginTop: 5 }]}>Primary Diner:</Text>

          <View style={Styles.diningDetailsScreen.container.inputContainer}>
            <TextInput
              style={[Styles.profileScreen.inputContainer.textInput, { width: '100%' }]}
              value={'@' + primaryDiner}
              onChangeText={setPrimaryDiner}
            />
            <View style={Styles.diningDetailsScreen.container.inputContainer.closeIcon}>
              <TouchableOpacity onPress={() => setPrimaryDiner('')}>
                <FontAwesome
                  name="close"
                  size={24}
                  color={COLORS.goDutchRed}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[Styles.diningDetailsScreen.container.label, { marginTop: 5 }]}>Date:</Text>

          <View style={Styles.diningDetailsScreen.container.inputContainer}>
            <TextInput
              style={[Styles.profileScreen.inputContainer.textInput, { width: '100%' }]}
              value={formatReceiptDate(eventDate)}
              onChangeText={setEventDate}
            />
            <View style={Styles.diningDetailsScreen.container.inputContainer.closeIcon}>
              <TouchableOpacity onPress={() => setEventDate('')}>
                <FontAwesome
                  name="close"
                  size={24}
                  color={COLORS.goDutchRed}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[Styles.diningDetailsScreen.container.label, { marginTop: 5 }]}>Restaurant/Bar:</Text>

          <View style={Styles.diningDetailsScreen.container.inputContainer}>
            <TextInput
              style={[Styles.profileScreen.inputContainer.textInput, { width: '100%' }]}
              value={eventLocation}
              onChangeText={setEventLocation}
            />
            <View style={Styles.diningDetailsScreen.container.inputContainer.closeIcon}>
              <TouchableOpacity onPress={() => setEventLocation('')}>
                <FontAwesome
                  name="close"
                  size={24}
                  color={COLORS.goDutchRed}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[Styles.diningDetailsScreen.container.label, { marginTop: 5 }]}>Event Title:</Text>

          <View style={Styles.diningDetailsScreen.container.inputContainer}>
            <TextInput
              style={[Styles.profileScreen.inputContainer.textInput, { width: '100%' }]}
              value={eventTitle}
              onChangeText={setEventTitle}
            />
            <View style={Styles.diningDetailsScreen.container.inputContainer.closeIcon}>
              <TouchableOpacity onPress={() => setEventTitle('')}>
                <FontAwesome
                  name="close"
                  size={24}
                  color={COLORS.goDutchRed}
                />
              </TouchableOpacity>
            </View>
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
