import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import FavoritesButton from '../components/ui/FavoritesButton'
import FavoritesIcon from '../components/ui/FavoritesIcon'
import Images from '../assets/images/images'
import Styles from '../style'
import PrimaryButton from '../components/ui/PrimaryButton'

const RestaurantDetailsScreen = () => {
  return (
    <LogoScreenWrapper
      backgroundColor={COLORS.logoScreenBackground}
      useLogo={false}
    >
      <Image
        source={Images.dining_detail}
        style={Styles.diningDetailsScreen.image}
      />

      <View style={Styles.diningDetailsScreen.container}>
        <Text>Restaurant Name</Text>
        {/* <Text style={Styles.diningDetailsScreen.container.heading}>Confirm dining details:</Text>
        <View>
          <Text style={Styles.diningDetailsScreen.container.label}>Date:</Text>
          <TextInput
            style={Styles.profileScreen.inputContainer.textInput}
            placeholder="09/24/2025"
          />
        </View>

        <View>
          <Text style={[Styles.diningDetailsScreen.container.label, { marginTop: 5 }]}>Restaurant/Bar:</Text>
          <TextInput
            style={Styles.profileScreen.inputContainer.textInput}
            placeholder="Outback Steakhouse"
          />
        </View>

        <View>
          <Text style={[Styles.diningDetailsScreen.container.label, { marginTop: 5 }]}>Event Title:</Text>
          <TextInput
            style={Styles.profileScreen.inputContainer.textInput}
            placeholder="Danni's Birthday Dinner"
          />
        </View> */}
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

export default RestaurantDetailsScreen
