import { View, Text } from 'react-native'
import Style from '../style'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Slider from '../components/Slider'
import { COLORS } from '../constants/constants'

const HomeScreen = () => {
  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View>
        <Text style={Style.homeScreen.heading}>Welcome, Theo!</Text>
        <Text style={Style.homeScreen.welcomeMessage}>Find restaurants near you!</Text>
      </View>
      <Slider />
    </LogoScreenWrapper>
  )
}

export default HomeScreen
