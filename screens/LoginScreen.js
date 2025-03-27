import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PrimaryButton from '../components/PrimaryButton'
import Style from '../style'
import Images from '../assets/images/images'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import { scaleFont } from '../utils/utils'

const LoginScreen = ({ navigation }) => {
  return (
    <View style={Style.logInScreen.container}>
      <Text
        style={{
          fontSize: scaleFont(35),
          fontFamily: 'Poppins-ExtraBold',
          letterSpacing: 1,
        }}
      >
        Featured Restaurant
      </Text>

      <View
        style={{
          width: SCREEN_WIDTH * 0.95,
          height: '40%',
          borderColor: 'red',
          borderWidth: 1,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>VIDEO</Text>
      </View>
      <View style={Style.logInScreen.container.modal}>
        <Image
          source={Images.go_dutch_background}
          style={Style.logInScreen.container.modal.backgroundImage}
        />
        <View style={Style.logInScreen.container.modal.inputsContainer}>
          <Text style={Style.registrationScreen.inputLabels}>Username</Text>
          <TextInput style={Style.registrationScreen.textInput} />
          <Text style={Style.registrationScreen.inputLabels}>Password</Text>
          <View style={Style.logInScreen.container.modal.passwordInput}>
            <TextInput
              style={[Style.registrationScreen.textInput, { width: '100%' }]}
              secureTextEntry
            />
            <TouchableOpacity style={Style.logInScreen.container.modal.passwordInput.passwordIcon}>
              <Ionicons
                name="eye-off-outline"
                size={24}
                color={COLORS.goDutchRed}
              />
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}>Log In</PrimaryButton>
      </View>
    </View>
  )
}

export default LoginScreen
