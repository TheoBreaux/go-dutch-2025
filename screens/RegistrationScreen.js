import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/PrimaryButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'

const RegistrationScreen = ({ navigation }) => {
  return (
    <LogoScreenWrapper>
      <View style={Style.registrationScreen.imageContainer}>
        <TouchableOpacity style={Style.registrationScreen.imageContainer.icon}>
          <MaterialCommunityIcons
            name="camera"
            size={30}
            color={COLORS.goDutchRed}
          />
        </TouchableOpacity>
        <Image />
      </View>

      <ScrollView contentContainerStyle={Style.registrationScreen.inputsScrollContainer}>
        <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer}>
          <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer.firstNameInput}>
            <Text style={Style.registrationScreen.inputLabels}>First Name</Text>
            <TextInput style={Style.registrationScreen.textInput} />
          </View>

          <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer.lastNameInput}>
            <Text style={Style.registrationScreen.inputLabels}>Last Name</Text>
            <TextInput style={Style.registrationScreen.textInput} />
          </View>
        </View>

        <View style={Style.registrationScreen.inputsScrollContainer.inputsContainer}>
          <Text style={Style.registrationScreen.inputLabels}>Email</Text>
          <TextInput style={Style.registrationScreen.textInput} />

          <Text style={Style.registrationScreen.inputLabels}>Create Username</Text>
          <TextInput style={Style.registrationScreen.textInput} />
          <Text style={Style.registrationScreen.inputLabels}>Password</Text>
          <TextInput style={Style.registrationScreen.textInput} />
          <Text style={Style.registrationScreen.inputLabels}>Confirm Password</Text>
          <TextInput style={Style.registrationScreen.textInput} />
        </View>
        <PrimaryButton
          outterWidth={SCREEN_WIDTH * 0.9}
          innerWidth={SCREEN_WIDTH * 0.85}
        >
          Submit
        </PrimaryButton>
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default RegistrationScreen
