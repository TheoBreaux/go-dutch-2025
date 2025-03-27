import { View, Text, Image } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import PrimaryButton from '../components/PrimaryButton'
import Style from '../style'
import Images from '../assets/images/images'

const WelcomeScreen = ({ navigation }) => {
  return (
    <LogoScreenWrapper opacity={0.1}>
      <Text style={Style.loginScreen.header} numberOfLines={2}>Would you like to Go Dutch?</Text>
      <Image
        source={Images.go_dutch_split_button}
        style={Style.loginScreen.icon}
      />
      <View style={Style.loginScreen.buttonContainer}>
        <PrimaryButton onPress={() => navigation.navigate('Registration')}>Sign Up</PrimaryButton>
        <PrimaryButton onPress={() => navigation.navigate('Login')}>Log In</PrimaryButton>
      </View>
      <Image
        source={Images.go_dutch_background}
        style={Style.loginScreen.patternImage}
      />
    </LogoScreenWrapper>
  )
}

export default WelcomeScreen

