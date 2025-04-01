import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Style from '../style'
import Images from '../assets/images/images'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS } from '../constants/constants'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { useState } from 'react'

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <LogoScreenWrapper>
      <View style={Style.logInScreen.container}>
        <Image
          source={Images.go_dutch_split_button}
          style={Style.logInScreen.container.logo}
        />
        <View style={Style.logInScreen.container.modal.inputsContainer}>
          <Text style={Style.registrationScreen.inputLabels}>Email</Text>
          <TextInput style={Style.registrationScreen.textInput} />
          <Text style={[Style.registrationScreen.inputLabels, { marginTop: 10 }]}>Password</Text>
          <View style={Style.logInScreen.container.modal.passwordInput}>
            <TextInput
              style={[Style.registrationScreen.textInput, { width: '100%' }]}
              secureTextEntry
            />
            <TouchableOpacity style={Style.logInScreen.container.modal.passwordInput.passwordIcon}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color={COLORS.goDutchRed}
              />
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          onPress={() => {
            navigation.navigate('Tabs', { screen: 'Home' })
          }}
        >
          Submit
        </PrimaryButton>
      </View>
    </LogoScreenWrapper>
  )
}

export default LoginScreen
