import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Style from '../style'
import Images from '../assets/images/images'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS } from '../constants/constants'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { useState } from 'react'
import { ErrorMessage, Formik } from 'formik'

const LoginScreen = ({ navigation }) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

  const handleFormSubmit = async (values) => {
    const userInfo = {
      email: values.email,
      password: values.password,
    }

    console.log(userInfo)

    // try {
    //   const response = await fetch('https://5574-76-32-124-165.ngrok-free.app/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userInfo),
    //   })

    //   const data = await response.json()

    //   if (data.detail) {
    //     setError(data.detail)
    //   } else {
    //     dispatch(setUser(data))
    //     handleLocationSearch()
    //     navigation.navigate('Main', { screen: 'Home' })
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
    // Keyboard.dismiss()
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
          onSubmit={handleFormSubmit}
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
                  style={{ color: 'red' }}
                />

                <Text style={[Style.registrationScreen.inputLabels, { marginTop: 10 }]}>Password</Text>
                <View style={Style.logInScreen.container.modal.passwordInput}>
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
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={24}
                      color={COLORS.goDutchRed}
                    />
                  </TouchableOpacity>
                </View>
                <ErrorMessage
                  name="password"
                  component={Text}
                  style={{ color: 'red' }}
                />
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
