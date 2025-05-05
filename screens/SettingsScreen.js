import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import { ASSET_URL, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import EditProfileImageHeader from '../components/EditProfileImageHeader'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, Formik } from 'formik'
import Ionicons from '@expo/vector-icons/Ionicons'
import { scaleFont } from '../utils/utils'
import Toast from 'react-native-toast-message'
import { logoutUser } from '../state/actions/actions'

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.app.user)

  const [isFormValid, setIsFormValid] = useState(false)
  const [image, setImage] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [updatePassword, setUpdatePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
    navigation.navigate('Screens', { screen: 'Welcome', params: { user } })
  }

  const handleUpdateUser = (values) => {
    console.log('PRESSING')
    const updatedUserInfo = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      username: values.username.toLowerCase().trim(),
      bio: values.bio,
      favoriteCuisine: values.favoriteCuisine,
      birthday: values.birthday,
      location: values.location,
      password: values.password,
      confirmPassword: values.confirmPassword,
      userId: user.userId,
    }

    console.log(updatedUserInfo)
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <EditProfileImageHeader
        image={ASSET_URL + user.imgUrl}
        setImage={setImage}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={Styles.profileScreen.scrollViewContainer}
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: SCREEN_WIDTH * 0.9 }}>
                  <TouchableOpacity
                    style={{ marginTop: 10 }}
                    onPress={() => setUpdatePassword(!updatePassword)}
                  >
                    <Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: scaleFont(20), color: COLORS.goDutchRed }}>
                      {updatePassword ? 'Hide' : 'Update'} Password
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginTop: 10 }}
                    onPress={handleLogOut}
                  >
                    <Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: scaleFont(20), color: COLORS.goDutchRed }}>Sign Out</Text>
                  </TouchableOpacity>
                </View>

                <View style={Styles.profileScreen.inputContainer}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={Styles.profileScreen.inputContainer.inputLabel}>First Name</Text>
                    <TextInput
                      style={Styles.profileScreen.inputContainer.textInput}
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
                    <Text style={Styles.profileScreen.inputContainer.inputLabel}>Last Name</Text>
                    <TextInput
                      style={Styles.profileScreen.inputContainer.textInput}
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

                <View style={Styles.profileScreen.inputContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={Styles.profileScreen.inputContainer.inputLabel}>Email</Text>
                    <TextInput
                      style={Styles.profileScreen.inputContainer.textInput}
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
                    <View style={Styles.profileScreen.inputContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={Styles.profileScreen.inputContainer.inputLabel}>Password</Text>
                        <View style={Styles.logInScreen.container.modal.passwordInput}>
                          <TextInput
                            style={[Styles.registrationScreen.textInput, { width: '100%', padding: 8 }]}
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
                    <View style={Styles.profileScreen.inputContainer}>
                      <View style={{ flex: 1 }}>
                        <Text style={Styles.profileScreen.inputContainer.inputLabel}>Confirm Password</Text>
                        <View style={Styles.logInScreen.container.modal.passwordInput}>
                          <TextInput
                            style={[Styles.registrationScreen.textInput, { width: '100%', padding: 8 }]}
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

                <View style={Styles.profileScreen.inputContainer}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={Styles.profileScreen.inputContainer.inputLabel}>Username</Text>
                    <TextInput
                      style={Styles.profileScreen.inputContainer.textInput}
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
                    <Text style={Styles.profileScreen.inputContainer.inputLabel}>Favorite Cuisine</Text>
                    <TextInput
                      style={Styles.profileScreen.inputContainer.textInput}
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

                <View style={Styles.profileScreen.inputContainer}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={Styles.profileScreen.inputContainer.inputLabel}>Birthday</Text>
                    <TextInput
                      style={Styles.profileScreen.inputContainer.textInput}
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
                    <Text style={Styles.profileScreen.inputContainer.inputLabel}>Location</Text>
                    <TextInput
                      style={Styles.profileScreen.inputContainer.textInput}
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

                <View style={Styles.profileScreen.scrollViewContainer.bioContainer}>
                  <Text style={Styles.profileScreen.inputContainer.inputLabel}>Bio</Text>
                  <TextInput
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={[Styles.profileScreen.inputContainer.textInput, { height: SCREEN_HEIGHT * 0.1 }]}
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

                <View style={Styles.profileScreen.buttonContainer}>
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
