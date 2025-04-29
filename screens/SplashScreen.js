import { useEffect } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import SpinningLogo from '../components/ui/SpinningLogo'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome')
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigation])

  return (
    <LogoScreenWrapper
      backgroundColor="black"
      opacity={0.5}
    >
      <SpinningLogo />
    </LogoScreenWrapper>
  )
}

export default SplashScreen
