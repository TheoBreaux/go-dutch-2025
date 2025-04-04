import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Style from '../style'
import Images from '../assets/images/images'
import Ionicons from '@expo/vector-icons/Ionicons'
import { API_URL, COLORS } from '../constants/constants'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { useState } from 'react'
import { ErrorMessage, Formik } from 'formik'
import API from '../state/api'

const LoginScreen = ({ navigation }) => {
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
    actions.resetForm()
    setLoading(true)

    const userInfo = {
      email: values.email.trim(),
      password: values.password.trim(),
    }

    console.log("USER INFO: ", userInfo)

    try {
      const response = await API('POST', `${API_URL}/logIn`, userInfo)
      console.log('RESPONSE: ', response)
    } catch (error) {
      setError('Failed to fetch data')
      console.error('Axios Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LogoScreenWrapper>
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
                <TextInput
                  style={Style.registrationScreen.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={!showPassword}
                />
                <ErrorMessage
                  name="password"
                  component={Text}
                  style={{ color: COLORS.goDutchRed }}
                />
                <View style={Style.logInScreen.container.modal.passwordInput}>
                  <TouchableOpacity
                    style={Style.logInScreen.container.modal.passwordInput.passwordIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={24}
                      color={COLORS.goDutchRed}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
            </>
          )}
        </Formik>
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default LoginScreen
