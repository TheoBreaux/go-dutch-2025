import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import Images from '../assets/images/images'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/PrimaryButton'
import { scaleFont } from '../utils/utils'

const ProfileScreen = () => {
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

      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'space-between', width: SCREEN_WIDTH * 0.9 }}>
          <View>
            <Text style={Style.profileScreen.inputLabel}>Bio</Text>
            <TextInput
              multiline={true}
              style={Style.profileScreen.textInput}
            />
          </View>
        </View>

        <View style={Style.registrationScreen.inputsScrollContainer.inputsContainer}>
          <Text style={Style.profileScreen.inputLabel}>Favorite Cuisine</Text>
          <TextInput style={Style.profileScreen.textInput} />
        </View>

        <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer}>
          <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer.firstNameInput}>
            <Text style={Style.profileScreen.inputLabel}>First Name</Text>
            <TextInput style={Style.profileScreen.textInput} />
          </View>

          <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer.lastNameInput}>
            <Text style={Style.profileScreen.inputLabel}>Last Name</Text>
            <TextInput style={Style.profileScreen.textInput} />
          </View>
        </View>
        <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer}>
          <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer.firstNameInput}>
            <Text style={Style.profileScreen.inputLabel}>Username</Text>
            <TextInput style={Style.profileScreen.textInput} />
          </View>

          <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer.lastNameInput}>
            <Text style={Style.profileScreen.inputLabel}>Email</Text>
            <TextInput style={Style.profileScreen.textInput} />
          </View>
        </View>
        <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer}>
          <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer.firstNameInput}>
            <Text style={Style.profileScreen.inputLabel}>Birthday</Text>
            <TextInput style={Style.profileScreen.textInput} />
          </View>

          <View style={Style.registrationScreen.inputsScrollContainer.nameInputsContainer.lastNameInput}>
            <Text style={Style.profileScreen.inputLabel}>Location</Text>
            <TextInput style={Style.profileScreen.textInput} />
          </View>
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9 }}>
        <PrimaryButton>Return</PrimaryButton>
        <PrimaryButton>Save</PrimaryButton>
      </View>
    </LogoScreenWrapper>
  )
}

export default ProfileScreen
