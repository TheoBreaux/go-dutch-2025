import { View, Modal, ImageBackground } from 'react-native'
import PrimaryButton from './PrimaryButton'
import Images from '../../assets/images/images'
import Styles from '../../style'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/constants'

const CustomModalContainer = ({
  animationType = 'fade',
  transparent = true,
  visible,
  onPress1,
  onPress2,
  buttonText1,
  buttonText2,
  children,
  buttons = true,
  height = SCREEN_HEIGHT * 0.6,
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
    >
      <View style={Styles.customModalContainer.overlay}>
        <View style={[Styles.customModalContainer.modalContainer, { height }]}>
          <ImageBackground
            source={Images.modal_background}
            style={Styles.customModalContainer.imageBackground}
          >
            {children}
            {buttons && (
              <View style={Styles.customModalContainer.buttonsContainer}>
                <PrimaryButton
                  outerWidth={SCREEN_WIDTH * 0.3}
                  innerWidth={SCREEN_WIDTH * 0.28}
                  onPress={onPress1}
                >
                  {buttonText1}
                </PrimaryButton>
                <PrimaryButton
                  outerWidth={SCREEN_WIDTH * 0.3}
                  innerWidth={SCREEN_WIDTH * 0.28}
                  onPress={onPress2}
                >
                  {buttonText2}
                </PrimaryButton>
              </View>
            )}
          </ImageBackground>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModalContainer
