import { View, Text, Image, TextInput } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import Images from '../assets/images/images'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import { useSelector } from 'react-redux'

const DiningDetailScreen = () => {
  const eventData = useSelector((state) => state.app.receiptData)

  console.log("Event DATA: ", eventData)

  return (
    <LogoScreenWrapper
      backgroundColor={COLORS.logoScreenBackground}
      useLogo={false}
    >
      <Image
        source={Images.dining_detail}
        style={Style.diningDetailsScreen.image}
      />

      <View style={Style.diningDetailsScreen.container}>
        <Text style={Style.diningDetailsScreen.container.heading}>Confirm dining details:</Text>
        <View>
          <Text style={Style.diningDetailsScreen.container.label}>Date:</Text>
          <TextInput
            style={Style.profileScreen.inputContainer.textInput}
            placeholder="09/24/2025"
          />
        </View>

        <View>
          <Text style={[Style.diningDetailsScreen.container.label, { marginTop: 5 }]}>Restaurant/Bar:</Text>
          <TextInput
            style={Style.profileScreen.inputContainer.textInput}
            placeholder="Outback Steakhouse"
          />
        </View>

        <View>
          <Text style={[Style.diningDetailsScreen.container.label, { marginTop: 5 }]}>Event Title:</Text>
          <TextInput
            style={Style.profileScreen.inputContainer.textInput}
            placeholder="Danni's Birthday Dinner"
          />
        </View>
      </View>
      <PrimaryButton
        outterWidth={SCREEN_WIDTH * 0.75}
        innerWidth={SCREEN_WIDTH * 0.7}
      >
        Confirm Details
      </PrimaryButton>
    </LogoScreenWrapper>
  )
}

export default DiningDetailScreen
