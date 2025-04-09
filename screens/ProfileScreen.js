import { View, Text, ScrollView, TextInput } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import { COLORS } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import EditProfileImageHeader from '../components/EditProfileImageHeader'
import { useState } from 'react'

const ProfileScreen = () => {
  const [image, setImage] = useState()
  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <EditProfileImageHeader
        image={image}
        setImage={setImage}
      />

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
