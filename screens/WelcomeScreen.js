import { View, Text, Image } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import PrimaryButton from '../components/ui/PrimaryButton'
import Style from '../style'
import Images from '../assets/images/images'

const WelcomeScreen = ({ navigation }) => {
  return (
    <LogoScreenWrapper opacity={0.1}>
      <Text
        style={Style.welcomeScreen.header}
        numberOfLines={2}
      >
        Would you like to Go Dutch?
      </Text>
      <Image
        source={Images.go_dutch_split_button}
        style={Style.welcomeScreen.icon}
      />
      <View style={Style.welcomeScreen.buttonContainer}>
        <PrimaryButton onPress={() => navigation.navigate('Registration')}>Sign Up</PrimaryButton>
        <PrimaryButton onPress={() => navigation.navigate('LogIn')}>Log In</PrimaryButton>
      </View>
      <Image
        source={Images.go_dutch_background}
        style={Style.welcomeScreen.patternImage}
      />
    </LogoScreenWrapper>
  )
}

export default WelcomeScreen
