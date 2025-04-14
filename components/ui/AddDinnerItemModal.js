import { Text, TextInput, View, Modal, ImageBackground } from 'react-native'
import PrimaryButton from './PrimaryButton'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/constants'
import { scaleFont } from '../../utils/utils'

const AddDinnerItemModal = ({ setNewItemName, setNewItemPrice, newItemName, newItemPrice, setAddingNewItem, addItem }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
    >
      <View style={Styles.customModalContainer.overlay}>
        <View style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.45, borderRadius: 10, overflow: 'hidden' }}>
          <ImageBackground
            source={Images.modal_background}
            style={Styles.customModalContainer.imageBackground}
          >
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: scaleFont(20) }}>Please enter missing items</Text>

            <View style={{ alignItems: 'center', width: SCREEN_WIDTH * 0.9 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: scaleFont(20) }}>Item:</Text>
              <TextInput
                style={{
                  width: SCREEN_WIDTH * 0.75,
                  height: SCREEN_HEIGHT * 0.06,
                  borderColor: COLORS.inputBorder,
                  borderWidth: 1,
                  marginBottom: 5,
                  padding: 5,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 25,
                }}
                value={newItemName}
                onChangeText={(text) => setNewItemName(text)}
              />
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: scaleFont(20) }}>Price:</Text>
              <TextInput
                style={{
                  width: SCREEN_WIDTH * 0.75,
                  height: SCREEN_HEIGHT * 0.06,
                  borderColor: COLORS.inputBorder,
                  borderWidth: 1,
                  marginBottom: 5,
                  padding: 5,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 25,
                }}
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
