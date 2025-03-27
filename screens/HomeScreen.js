import { View, Text, Image } from 'react-native'
import Style from '../style'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import { scaleFont } from '../utils/utils'
import PrimaryButton from '../components/PrimaryButton'

const HomeScreen = () => {
  return (
    <LogoScreenWrapper>
      <View>
        <Text style={Style.homeScreen.heading}>Welcome, Theo!</Text>
        <Text style={Style.homeScreen.welcomeMessage}>Find restaurants near you!</Text>
      </View>
    </LogoScreenWrapper>
  )
}

export default HomeScreen
