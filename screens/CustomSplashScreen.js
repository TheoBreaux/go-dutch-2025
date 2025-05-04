import LogoScreenWrapper from '../components/LogoScreenWrapper'
import SpinningLogo from '../components/ui/SpinningLogo'

const CustomSplashScreen = () => {
  return (
    <LogoScreenWrapper
      backgroundColor="black"
      opacity={0.5}
    >
      <SpinningLogo />
    </LogoScreenWrapper>
  )
}

export default CustomSplashScreen
