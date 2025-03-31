import { View, Text, Image } from 'react-native'
import Style from '../style'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import { scaleFont } from '../utils/utils'
import PrimaryButton from '../components/ui/PrimaryButton'
import { RESTAURANT_IMAGES } from '../assets/images/images'
import Slider from '../components/Slider'

const HomeScreen = () => {
  return (
    <LogoScreenWrapper>
      <View>
        <Text style={Style.homeScreen.heading}>Welcome, Theo!</Text>
        <Text style={Style.homeScreen.welcomeMessage}>Find restaurants near you!</Text>
      </View>
      <Slider />
    </LogoScreenWrapper>
  )
}

export default HomeScreen
