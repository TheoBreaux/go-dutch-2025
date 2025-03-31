import { StyleSheet, Text, View, Modal, Image } from 'react-native'
import PrimaryButton from './PrimaryButton'
import Images from '../../assets/images/images'
import { SCREEN_WIDTH } from '../../constants/constants'

const CustomModal = ({ animationType, transparent, visible, modalText, onPress1, onPress2, buttonText1, buttonText2, modalHeight }) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
    >
      <View style={styles.overlay}>
        <View>
          <View>
            <Image
              style={styles.modalImage}
              source={Images.glass_clanking}
            />

            <Text>Are we celbrating someone?</Text>

            <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, alignItems: 'center' }}>
              <PrimaryButton
                outterWidth={SCREEN_WIDTH * 0.45}
                onPress={onPress1}
              >
                Yes
              </PrimaryButton>
              <PrimaryButton
                outterWidth={SCREEN_WIDTH * 0.45}
                onPress={onPress2}
              >
                No
              </PrimaryButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})

export default CustomModal
