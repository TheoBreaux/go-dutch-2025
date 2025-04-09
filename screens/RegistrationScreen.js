import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { useState } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import { API_URL, COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import EditProfileImageHeader from '../components/EditProfileImageHeader'
import { ErrorMessage, Formik } from 'formik'
import Toast from 'react-native-toast-message'











const RegistrationScreen = ({ navigation }) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [image, setImage] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)
  // const [confirmedPassword, setConfirmedPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    createUsername: '',
    password: '',
    confirmedPassword: '',
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

    if (!values.createUsername) {
      errors.createUsername = 'Please create your username'
    }

    if (!values.password) {
      errors.password = 'Please enter a password'
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(values.password)) {
      errors.password = 'Must be at least 5 characters: 1 uppercase, 1 lowercase, and 1 digit'
    }

    if (!values.confirmedPassword) {
      errors.confirmedPassword = 'Please confirm your password'
    } else if (values.confirmedPassword !== values.password) {
      errors.confirmedPassword = 'Passwords do not match'
    }

    const isValid = Object.keys(errors).length === 0
    setIsFormValid(isValid)
    return errors
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const handleRegistration = async (values, actions) => {
    //actions.resetForm()
    setLoading(true)

    const formData = new FormData()

    formData.append('firstName', values.firstName.trim())
    formData.append('lastName', values.lastName.trim())
    formData.append('email', values.email.toLowerCase().trim())
    formData.append('username', values.createUsername.toLowerCase().trim())
    formData.append('password', values.password.trim())

    if (image) {
      formData.append('profileImage', {
        uri: image,
        name: 'profile.jpg',
        type: 'image/jpeg',
      })
    }

    try {
      const response = await fetch(`${API_URL}/signUp`, { method: 'POST', body: formData })

      if (!response.ok) {
        // If the response is not OK (status not in 200 range), throw an error
        const errorData = await response.json()
        throw new Error(errorData?.message || 'Something went wrong. Please try again.')
      }

      const responseData = await response.json()
      navigation.navigate('Tabs', { screen: 'Home' })

      Toast.show({
        type: 'success',
        text1: 'Success 🎉',
        text2: responseData?.message || 'Registration successful!',
        position: 'top',
        visibilityTime: 3500,
      })
    } catch (error) {
      setError(error.message)

      Toast.show({
        type: 'error',
        text1: 'Error 😞',
        text2: error.message,
        position: 'top',
        visibilityTime: 3500,
      })

      console.error('Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <EditProfileImageHeader
        image={image}
        setImage={setImage}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={Styles.registrationScreen.inputsScrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={Styles.registrationScreen.formContainer}>
            <Formik
              initialValues={initialValues}
              validate={validateForm}
              onSubmit={handleRegistration}
            >
              {({ handleChange, handleSubmit, handleBlur, values }) => (
                <>
                  <View style={Styles.registrationScreen.inputsScrollContainer.nameInputsContainer}>
                    <View style={Styles.registrationScreen.inputsScrollContainer.nameInputsContainer.firstNameInput}>
                      <Text style={Styles.registrationScreen.inputLabels}>First Name</Text>
                      <TextInput
                        style={[Styles.registrationScreen.textInput]}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                      />
                      <ErrorMessage
                        name="firstName"
                        component={Text}
                        style={{ color: COLORS.goDutchRed }}
                      />
                    </View>

                    <View style={Styles.registrationScreen.inputsScrollContainer.nameInputsContainer.lastNameInput}>
                      <Text style={Styles.registrationScreen.inputLabels}>Last Name</Text>
                      <TextInput
                        style={Styles.registrationScreen.textInput}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                      />
                      <ErrorMessage
                        name="lastName"
                        component={Text}
                        style={{ color: COLORS.goDutchRed }}
                      />
                    </View>
                  </View>

                  <View style={Styles.registrationScreen.inputsScrollContainer.inputsContainer}>
                    <Text style={Styles.registrationScreen.inputLabels}>Email</Text>
                    <TextInput
                      style={Styles.registrationScreen.textInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                    <ErrorMessage
                      name="email"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                    <Text style={Styles.registrationScreen.inputLabels}>Create Username</Text>
                    <TextInput
                      style={Styles.registrationScreen.textInput}
                      onChangeText={handleChange('createUsername')}
                      onBlur={handleBlur('createUsername')}
                      value={values.createUsername}
                      autoCapitalize="none"
                    />
                    <ErrorMessage
                      name="createUsername"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />

                    <Text style={Styles.registrationScreen.inputLabels}>Password</Text>
                    <View style={Styles.logInScreen.container.modal.passwordInput}>
                      <TextInput
                        style={[Styles.registrationScreen.textInput, { width: '100%' }]}
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
                    <Text style={Styles.registrationScreen.inputLabels}>Confirm Password</Text>
                    <View style={Styles.logInScreen.container.modal.passwordInput}>
                      <TextInput
                        style={[Styles.registrationScreen.textInput, { width: '100%' }]}
                        onChangeText={handleChange('confirmedPassword')}
                        onBlur={handleBlur('confirmedPassword')}
                        value={values.confirmedPassword}
                        secureTextEntry={!showConfirmedPassword}
                      />
                      <TouchableOpacity
                        style={Styles.logInScreen.container.modal.passwordInput.passwordIcon}
                        onPress={() => setShowConfirmedPassword(!showConfirmedPassword)}
                      >
                        <Ionicons
                          name={showConfirmedPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={24}
                          color={COLORS.goDutchRed}
                        />
                      </TouchableOpacity>
                    </View>
                    <ErrorMessage
                      name="confirmedPassword"
                      component={Text}
                      style={{ color: COLORS.goDutchRed }}
                    />
                  </View>
                  <PrimaryButton
                    onPress={handleSubmit}
                    outterWidth={SCREEN_WIDTH * 0.9}
                    innerWidth={SCREEN_WIDTH * 0.88}
                  >
                    Submit
                  </PrimaryButton>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default RegistrationScreen
