import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Style from '../style'
import Images from '../assets/images/images'
import Ionicons from '@expo/vector-icons/Ionicons'
import { API_URL, COLORS } from '../constants/constants'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { useState } from 'react'
import { ErrorMessage, Formik } from 'formik'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { setUser } from '../state/actions/actions'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [isFormValid, setIsFormValid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const initialValues = {
    email: '',
    password: '',
  }

  const validateForm = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'An email is required'
    }

    if (!values.password) {
      errors.password = 'Please enter a password'
    }

    const isValid = Object.keys(errors).length === 0
    setIsFormValid(isValid)
    return errors
  }

  const handleLogin = async (values, actions) => {
    // actions.resetForm()
    setLoading(true)

    const userInfo = {
      email: values.email.trim(),
      password: values.password.trim(),
    }
    try {
      const response = await fetch(`${API_URL}/logIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      })

      if (!response.ok) {
        // If the response is not OK (status not in 200 range), throw an error
        const errorData = await response.json()
        throw new Error(errorData?.message || 'Something went wrong. Please try again.')
      }

      const responseData = await response.json()

      dispatch(setUser(responseData))
      navigation.navigate('Tabs', { screen: 'Home' })

      Toast.show({
        type: 'success',
        text1: 'Success 🎉',
        text2: responseData?.message || 'Login successful!',
        position: 'top',
        visibilityTime: 3000,
      })
    } catch (error) {
      setError(error)

      Toast.show({
        type: 'error',
        text1: 'Error 😞',
        text2: error.message,
        position: 'top',
        visibilityTime: 3000,
      })
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LogoScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={Style.logInScreen.container}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleSubmit, handleBlur, values }) => (
              <>
                <Image
                  source={Images.go_dutch_split_button}
                  style={Style.logInScreen.container.logo}
                />
                <View style={Style.logInScreen.container.modal.inputsContainer}>
                  <Text style={Style.registrationScreen.inputLabels}>Email</Text>
                  <TextInput
                    style={Style.registrationScreen.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    autoCapitalize="none"
                  />
                  <ErrorMessage
                    name="email"
                    component={Text}
                    style={{ color: COLORS.goDutchRed }}
                  />

                  <Text style={[Style.registrationScreen.inputLabels, { marginTop: 10 }]}>Password</Text>

                  <View style={{ justifyContent: 'center' }}>
                    <TextInput
                      style={Style.registrationScreen.textInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={Style.logInScreen.container.modal.passwordInput.passwordIcon}
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

                <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default LoginScreen
