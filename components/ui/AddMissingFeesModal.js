import { Text, TextInput, View, Modal, ImageBackground } from 'react-native'
import PrimaryButton from './PrimaryButton'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { SCREEN_WIDTH } from '../../constants/constants'

const AddMissingFeesModal = ({ handleAddFee, setNewFeeName, setNewFeePrice, newFeeName, newFeePrice, setShowMissingFeesModal }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
    >
      <View style={Styles.customModalContainer.overlay}>
        <View style={Styles.addDinnerItemModal.container}>
          <ImageBackground
            source={Images.modal_background}
            style={Styles.customModalContainer.imageBackground}
          >
            <Text style={[Styles.addDinnerItemModal.container.header, { textAlign: 'center' }]}>Enter missing fee name and cost</Text>

            <View style={Styles.addDinnerItemModal.container.inputsContainer}>
              <Text style={Styles.addDinnerItemModal.container.inputsContainer.label}>Fee Name:</Text>
              <TextInput
                style={Styles.addDinnerItemModal.container.inputsContainer.input}
                value={newFeeName}
                onChangeText={(text) => setNewFeeName(text)}
              />
              <Text style={Styles.addDinnerItemModal.container.inputsContainer.label}>Cost:</Text>
              <TextInput
                style={Styles.addDinnerItemModal.container.inputsContainer.input}
                value={newFeePrice}
                onChangeText={(text) => setNewFeePrice(text)}
                keyboardType="numeric"
              />

              <View style={{ flexDirection: 'row' }}>
                <PrimaryButton
                  outerWidth={SCREEN_WIDTH * 0.37}
                  innerWidth={SCREEN_WIDTH * 0.35}
                  onPress={() => setShowMissingFeesModal(false)}
                >
                  Close
                </PrimaryButton>
                <PrimaryButton
                  outerWidth={SCREEN_WIDTH * 0.37}
                  innerWidth={SCREEN_WIDTH * 0.35}
                  onPress={() => {
                    if (!newFeeName || !newFeePrice) return
                    setShowMissingFeesModal(false)
                    setNewFeeName('')
                    setNewFeePrice('')
                    handleAddFee()
                  }}
                >
                  Submit
                </PrimaryButton>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  )
}

export default AddMissingFeesModal
