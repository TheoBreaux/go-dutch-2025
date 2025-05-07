import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import { ASSET_URL, COLORS, SCREEN_HEIGHT } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import EditProfileImageHeader from '../components/EditProfileImageHeader'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, Formik } from 'formik'
import Ionicons from '@expo/vector-icons/Ionicons'
import { logoutUser, updateUserProfile } from '../state/actions/actions'

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.app.user)
  const userId = useSelector((state) => state.app.user.userId)

  const [isFormValid, setIsFormValid] = useState(false)
  const [image, setImage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [updatePassword, setUpdatePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [localImageUri, setLocalImageUri] = useState(null) // Track local image selection

  const displayImageUri = localImageUri || (user.imgUrl ? ASSET_URL + user.imgUrl : null)

  const initialValues = {
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
    imgUrl: user.imgUrl || '',
  }

  const validateForm = (values) => {
    const errors = {}
    if (!values.firstName) {
      errors.firstName = 'First name required'
    }

    if (!values.lastName) {
      errors.lastName = 'Last name required'
    }

    if (!values.email) {
      errors.email = 'An email address is required'
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Please enter a valid email'
    }

    if (updatePassword) {
      if (!values.password) {
        errors.password = 'Please enter a password'
      } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(values.password)) {
        errors.password = 'Must be at least 5 characters: 1 uppercase, 1 lowercase, and 1 digit'
      }
    }

    if (updatePassword) {
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match'
      }
    }

    if (!values.username) {
      errors.username = 'Please enter your username'
    }

    if (!values.favoriteCuisine) {
      errors.favoriteCuisine = 'Please enter favorite cuisine'
    }

    if (!values.birthday) {
      errors.birthday = 'Please enter your birthday'
    }

    if (!values.location) {
      errors.location = 'Please enter your location'
    }

    if (!values.bio) {
      errors.bio = 'Please enter your bio'
    }

    const isValid = Object.keys(errors).length === 0
    setIsFormValid(isValid)
    return errors
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const handleLogOut = () => {
    dispatch(logoutUser())
    navigation.navigate('Screens', { screen: 'Welcome' })
  }

  const handleUpdateUser = (values) => {
    const formData = new FormData()

    // Append all text fields
    formData.append('firstName', values.firstName.trim())
    formData.append('lastName', values.lastName.trim())
    formData.append('email', values.email.toLowerCase().trim())
    formData.append('username', values.username.toLowerCase().trim())
    formData.append('bio', values.bio)
    formData.append('favoriteCuisine', values.favoriteCuisine)
    formData.append('birthday', values.birthday)
    formData.append('location', values.location)
    formData.append('password', values.password.trim())
    formData.append('userId', userId)

    // Append the image file correctly
    if (localImageUri) {
      formData.append('profileImage', {
        uri: localImageUri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      })
    }

    dispatch(updateUserProfile(formData))
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <EditProfileImageHeader
        image={displayImageUri}
        setImage={setLocalImageUri}
      />
      <View style={Styles.settingsScreen.actionTextButtonContainer}>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => setUpdatePassword(!updatePassword)}
        >
          <Text style={Styles.settingsScreen.actionTextButtonContainer.textButton}>{updatePassword ? 'Hide' : 'Update'} Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={handleLogOut}
        >
          <Text style={Styles.settingsScreen.actionTextButtonContainer.textButton}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={Styles.settingsScreen.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: SCREEN_HEIGHT * 0.1 }}
        >
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={handleUpdateUser}
          >
            {({ handleChange, handleSubmit, handleBlur, values }) => (
              <>
                <View style={Styles.settingsScreen.inputContainer}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={Styles.settingsScreen.inputContainer.inputLabel}>First Name</Text>
                    <TextInput
                      style={Styles.settingsScreen.inputContainer.textInput}
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                    />
                    <ErrorMessage
                      name="firstName"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Last Name</Text>
                    <TextInput
                      style={Styles.settingsScreen.inputContainer.textInput}
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                    />
                    <ErrorMessage
                      name="lastName"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                  </View>
                </View>

                <View style={Styles.settingsScreen.inputContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Email</Text>
                    <TextInput
                      style={Styles.settingsScreen.inputContainer.textInput}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    <ErrorMessage
                      name="email"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                  </View>
                </View>
                {updatePassword && (
                  <>
                    <View style={Styles.settingsScreen.inputContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Password</Text>
                        <View style={Styles.logInScreen.container.modal.passwordInput}>
                          <TextInput
                            style={[Styles.signUpScreen.textInput, { width: '100%', padding: 8 }]}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={!showPassword}
                          />
                          <TouchableOpacity
                            style={Styles.logInScreen.container.modal.passwordInput.passwordIcon}
                            onPress={() => setShowPassword(!showPassword)}
                          >
                            <Ionicons
                              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                              size={24}
                              color={COLORS.goDutchRed}
                            />
                          </TouchableOpacity>
                        </View>

                        <ErrorMessage
                          name="password"
                          component={Text}
                          style={{ color: COLORS.goDutchRed }}
                        />
                      </View>
                    </View>
                    <View style={Styles.settingsScreen.inputContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Confirm Password</Text>
                        <View style={Styles.logInScreen.container.modal.passwordInput}>
                          <TextInput
                            style={[Styles.signUpScreen.textInput, { width: '100%', padding: 8 }]}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={!showConfirmPassword}
                          />
                          <TouchableOpacity
                            style={Styles.logInScreen.container.modal.passwordInput.passwordIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <Ionicons
                              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                              size={24}
                              color={COLORS.goDutchRed}
                            />
                          </TouchableOpacity>
                        </View>

                        <ErrorMessage
                          name="confirmPassword"
                          component={Text}
                          style={{ color: COLORS.goDutchRed }}
                        />
                      </View>
                    </View>
                  </>
                )}

                <View style={Styles.settingsScreen.inputContainer}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Username</Text>
                    <TextInput
                      style={Styles.settingsScreen.inputContainer.textInput}
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                    />
                    <ErrorMessage
                      name="username"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Favorite Cuisine</Text>
                    <TextInput
                      placeholder="ex. Lebanese"
                      style={Styles.settingsScreen.inputContainer.textInput}
                      value={values.favoriteCuisine}
                      onChangeText={handleChange('favoriteCuisine')}
                      onBlur={handleBlur('favoriteCuisine')}
                    />
                    <ErrorMessage
                      name="favoriteCuisine"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                  </View>
                </View>

                <View style={Styles.settingsScreen.inputContainer}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Birthday</Text>
                    <TextInput
                      placeholder="ex. July 4"
                      style={Styles.settingsScreen.inputContainer.textInput}
                      value={values.birthday}
                      onChangeText={handleChange('birthday')}
                      onBlur={handleBlur('birthday')}
                    />
                    <ErrorMessage
                      name="birthday"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Location</Text>
                    <TextInput
                      placeholder="Chicago, IL"
                      style={Styles.settingsScreen.inputContainer.textInput}
                      value={values.location}
                      onChangeText={handleChange('location')}
                      onBlur={handleBlur('location')}
                    />
                    <ErrorMessage
                      name="location"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                  </View>
                </View>

                <View style={Styles.settingsScreen.scrollViewContainer.bioContainer}>
                  <Text style={Styles.settingsScreen.inputContainer.inputLabel}>Bio</Text>
                  <TextInput
                    placeholder="ex. I love delicious food and travel."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={[Styles.settingsScreen.inputContainer.textInput, { height: SCREEN_HEIGHT * 0.1 }]}
                    value={values.bio}
                    onChangeText={handleChange('bio')}
                    onBlur={handleBlur('bio')}
                  />
                  <ErrorMessage
                    name="bio"
                    component={Text}
                    style={{ color: COLORS.goDutchRed }}
                  />
                </View>

                <View style={Styles.settingsScreen.buttonContainer}>
                  <PrimaryButton onPress={() => navigation.goBack()}>Return</PrimaryButton>
                  <PrimaryButton onPress={handleSubmit}>Save</PrimaryButton>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default SettingsScreen
