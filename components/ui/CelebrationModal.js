import { View, Text, Image } from 'react-native'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import Images from '../../assets/images/images'

const CelebrationModal = () => {
  return (
    <CustomModalContainer
      buttonText1={'Yes'}
      buttonText2={'No'}
    >
      <View style={Styles.celebrationModal.content}>
        <Image
          style={Styles.celebrationModal.image}
          source={Images.glass_clanking}
          resizeMode="cover"
        />
      </View>

      <Text style={Styles.customModalContainer.text}>Are we celebrating someone?</Text>
    </CustomModalContainer>
  )
}

export default CelebrationModal
