import { View, Text, Image } from 'react-native'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import Images from '../../assets/images/images'

const CelebrationModal = ({ onPress1, onPress2 }) => {
  return (
    <CustomModalContainer
      animationType="fade"
      buttonText1={'Yes'}
      buttonText2={'No'}
      onPress1={onPress1}
      onPress2={onPress2}
    >
      <View style={Styles.celebrationModal.content}>
        <Image
          style={Styles.celebrationModal.image}
          source={Images.birthday_cake}
          resizeMode="cover"
        />
      </View>

      <Text style={Styles.customModalContainer.text}>Are we celebrating someone?</Text>
    </CustomModalContainer>
  )
}

export default CelebrationModal
