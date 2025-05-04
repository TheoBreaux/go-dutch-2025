import { View, Text, ScrollView, TextInput } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Style from '../style'
import { ASSET_URL, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import EditProfileImageHeader from '../components/EditProfileImageHeader'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ErrorMessage, Formik } from 'formik'

const SettingsScreen = () => {
  const user = useSelector((state) => state.app.user)
  const [image, setImage] = useState()
  const [isUpdating, setIsUpdating] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    password: '',
    confirmPassword: '',
    username: user.username || '',
    favoriteCuisine: user.favoriteCuisine || '',
    birthday: user.birthday || '',
    location: user.location || '',
    bio: user.bio || '',
  })

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <EditProfileImageHeader
        image={ASSET_URL + user.imgUrl}
        setImage={setImage}
      />

      {!isUpdating && (
        <ScrollView
          contentContainerStyle={Style.profileScreen.scrollViewContainer}
          style={{ marginBottom: SCREEN_HEIGHT * 0.1 }}
        >
          <View style={Style.profileScreen.inputContainer}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>First Name</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>Last Name</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.lastName}
                onChangeText={(text) => handleChange('lastName', text)}
              />
            </View>
          </View>

          <View style={Style.profileScreen.inputContainer}>
            <View style={{ flex: 1 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>Email</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
              />
            </View>
          </View>
          <View style={Style.profileScreen.inputContainer}>
            <View style={{ flex: 1 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>Password</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry
              />
            </View>
          </View>
          <View style={Style.profileScreen.inputContainer}>
            <View style={{ flex: 1 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>Confirm Password</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
                secureTextEntry
              />
            </View>
          </View>

          <View style={Style.profileScreen.inputContainer}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>Username</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.username}
                onChangeText={(text) => handleChange('username', text)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>Favorite Cuisine</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.favoriteCuisine}
                onChangeText={(text) => handleChange('favoriteCuisine', text)}
              />
            </View>
          </View>

          <View style={Style.profileScreen.inputContainer}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>Birthday</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.birthday}
                onChangeText={(text) => handleChange('birthday', text)}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={Style.profileScreen.inputContainer.inputLabel}>Location</Text>
              <TextInput
                style={Style.profileScreen.inputContainer.textInput}
                value={formData.location}
                onChangeText={(text) => handleChange('location', text)}
              />
            </View>
          </View>

          <View style={Style.profileScreen.scrollViewContainer.bioContainer}>
            <Text style={Style.profileScreen.inputContainer.inputLabel}>Bio</Text>
            <TextInput
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={[Style.profileScreen.inputContainer.textInput, { height: SCREEN_HEIGHT * 0.1 }]}
              value={formData.bio}
              onChangeText={(text) => handleChange('bio', text)}
            />
          </View>

          <View style={Style.profileScreen.buttonContainer}>
            <PrimaryButton>Save</PrimaryButton>
            <PrimaryButton>Sign Out</PrimaryButton>
          </View>
        </ScrollView>
      )}
    </LogoScreenWrapper>
  )
}

export default SettingsScreen
