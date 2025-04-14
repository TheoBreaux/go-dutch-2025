import { Text, TextInput, View, Modal, ImageBackground } from 'react-native'
import PrimaryButton from './PrimaryButton'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { SCREEN_WIDTH } from '../../constants/constants'

const AddDinnerItemModal = ({ setNewItemName, setNewItemPrice, newItemName, newItemPrice, setAddingNewItem, addItem }) => {
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
            <Text style={Styles.addDinnerItemModal.container.header}>Please enter missing items</Text>

            <View style={Styles.addDinnerItemModal.container.inputsContainer}>
              <Text style={Styles.addDinnerItemModal.container.inputsContainer.label}>Item:</Text>
              <TextInput
                style={Styles.addDinnerItemModal.container.inputsContainer.input}
                value={newItemName}
                onChangeText={(text) => setNewItemName(text)}
              />
              <Text style={Styles.addDinnerItemModal.container.inputsContainer.label}>Price:</Text>
              <TextInput
                style={Styles.addDinnerItemModal.container.inputsContainer.input}
                value={newItemPrice}
                onChangeText={(text) => setNewItemPrice(text)}
                keyboardType="numeric"
              />

              <View style={{ flexDirection: 'row' }}>
                <PrimaryButton
                  outterWidth={SCREEN_WIDTH * 0.37}
                  innerWidth={SCREEN_WIDTH * 0.35}
                  onPress={() => setAddingNewItem(false)}
                >
                  Close
                </PrimaryButton>
                <PrimaryButton
                  outterWidth={SCREEN_WIDTH * 0.37}
                  innerWidth={SCREEN_WIDTH * 0.35}
                  onPress={addItem}
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

export default AddDinnerItemModal
