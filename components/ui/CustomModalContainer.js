import { View, Modal, ImageBackground} from 'react-native'
import PrimaryButton from './PrimaryButton'
import Images from '../../assets/images/images'
import Styles from '../../style'
import { SCREEN_WIDTH } from '../../constants/constants'

const CustomModalContainer = ({ animationType, transparent, visible, onPress1, onPress2, buttonText1, buttonText2, children }) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
    >
      <View style={Styles.customModalContainer.overlay}>
        <View style={Styles.customModalContainer.modalContainer}>
          <ImageBackground
            source={Images.modal_background}
            style={Styles.customModalContainer.imageBackground}
          >
            {children}
            <View style={Styles.customModalContainer.buttonsContainer}>
              <PrimaryButton
                outterWidth={SCREEN_WIDTH * 0.3}
                innerWidth={SCREEN_WIDTH * 0.28}
                onPress={onPress1}
              >
                {buttonText1}
              </PrimaryButton>
              <PrimaryButton
                outterWidth={SCREEN_WIDTH * 0.3}
                innerWidth={SCREEN_WIDTH * 0.28}
                onPress={onPress2}
              >
                {buttonText2}
              </PrimaryButton>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModalContainer
