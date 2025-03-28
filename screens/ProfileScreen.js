import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS} from '../constants/constants'
import PrimaryButton from '../components/PrimaryButton'


const ProfileScreen = () => {
  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
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

      <ScrollView contentContainerStyle={Style.profileScreen.scrollViewContainer}>
        <View style={Style.profileScreen.scrollViewContainer.bioContainer}>
          <Text style={Style.profileScreen.inputContainer.inputLabel}>Bio</Text>
          <TextInput
            multiline={true}
            style={Style.profileScreen.inputContainer.textInput}
          />

          <Text style={Style.profileScreen.inputContainer.inputLabel}>Favorite Cuisine</Text>
          <TextInput style={Style.profileScreen.inputContainer.textInput} />
        </View>

        <View style={Style.profileScreen.inputContainer}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={Style.profileScreen.inputContainer.inputLabel}>First Name</Text>
            <TextInput style={Style.profileScreen.inputContainer.textInput} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={Style.profileScreen.inputContainer.inputLabel}>Last Name</Text>
            <TextInput style={Style.profileScreen.inputContainer.textInput} />
          </View>
        </View>

        <View style={Style.profileScreen.inputContainer}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={Style.profileScreen.inputContainer.inputLabel}>Username</Text>
            <TextInput style={Style.profileScreen.inputContainer.textInput} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={Style.profileScreen.inputContainer.inputLabel}>Email</Text>
            <TextInput style={Style.profileScreen.inputContainer.textInput} />
          </View>
        </View>
        <View style={Style.profileScreen.inputContainer}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={Style.profileScreen.inputContainer.inputLabel}>Birthday</Text>
            <TextInput style={Style.profileScreen.inputContainer.textInput} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={Style.profileScreen.inputContainer.inputLabel}>Location</Text>
            <TextInput style={Style.profileScreen.inputContainer.textInput} />
          </View>
        </View>
        <View style={Style.profileScreen.buttonContainer}>
          <PrimaryButton>Return</PrimaryButton>
          <PrimaryButton>Save</PrimaryButton>
        </View>
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default ProfileScreen
