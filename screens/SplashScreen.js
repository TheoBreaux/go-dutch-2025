import { Image } from 'react-native'
import Style from '../style'
import Images from '../assets/images/images'
import LogoScreenWrapper from '../components/LogoScreenWrapper'

const SplashScreen = () => {
  return (
    <LogoScreenWrapper
      backgroundColor="black"
      opacity={0.5}
    >
      <Image
        source={Images.go_dutch_split_button}
        style={Style.splashScreen.logo}
      />
    </LogoScreenWrapper>
  )
}

export default SplashScreen
