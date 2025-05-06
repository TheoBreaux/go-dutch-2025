import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { useState } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import EditProfileImageHeader from '../components/EditProfileImageHeader'
import { ErrorMessage, Formik } from 'formik'
import { signUpUser } from '../state/actions/actions'
import { useDispatch } from 'react-redux'

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [isFormValid, setIsFormValid] = useState(false)
  const [image, setImage] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)
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

  const handleSignup = async (values, actions) => {
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

    dispatch(signUpUser(formData))
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
          contentContainerStyle={Styles.signUpScreen.inputsScrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={Styles.signUpScreen.formContainer}>
            <Formik
              initialValues={initialValues}
              validate={validateForm}
              onSubmit={handleSignup}
            >
              {({ handleChange, handleSubmit, handleBlur, values }) => (
                <>
                  <View style={Styles.signUpScreen.inputsScrollContainer.nameInputsContainer}>
                    <View style={Styles.signUpScreen.inputsScrollContainer.nameInputsContainer.firstNameInput}>
                      <Text style={Styles.signUpScreen.inputLabels}>First Name</Text>
                      <TextInput
                        style={[Styles.signUpScreen.textInput]}
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

                    <View style={Styles.signUpScreen.inputsScrollContainer.nameInputsContainer.lastNameInput}>
                      <Text style={Styles.signUpScreen.inputLabels}>Last Name</Text>
                      <TextInput
                        style={Styles.signUpScreen.textInput}
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

                  <View style={Styles.signUpScreen.inputsScrollContainer.inputsContainer}>
                    <Text style={Styles.signUpScreen.inputLabels}>Email</Text>
                    <TextInput
                      style={Styles.signUpScreen.textInput}
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
                    <Text style={Styles.signUpScreen.inputLabels}>Create Username</Text>
                    <TextInput
                      style={Styles.signUpScreen.textInput}
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

                    <Text style={Styles.signUpScreen.inputLabels}>Password</Text>
                    <View style={Styles.logInScreen.container.modal.passwordInput}>
                      <TextInput
                        style={[Styles.signUpScreen.textInput, { width: '100%' }]}
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
                    <Text style={Styles.signUpScreen.inputLabels}>Confirm Password</Text>
                    <View style={Styles.logInScreen.container.modal.passwordInput}>
                      <TextInput
                        style={[Styles.signUpScreen.textInput, { width: '100%' }]}
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
                    outerWidth={SCREEN_WIDTH * 0.9}
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

export default SignUpScreen
