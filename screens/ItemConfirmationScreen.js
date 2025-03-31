import { View, Text, FlatList } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import CircularButton from '../components/ui/CircularButton'
import Entypo from '@expo/vector-icons/Entypo'

const ItemConfirmationScreen = () => {
  return (
    <LogoScreenWrapper>
      <View>
        <View style={Styles.itemConfirmationScreen.modalContainer}>
          <Text style={Styles.itemConfirmationScreen.modalContainer.text}>Confirm or add items!</Text>
          <View style={Styles.itemConfirmationScreen.modalContainer.buttonContainer}>
            <View style={{ marginHorizontal: 15 }}>
              <CircularButton
                icon={
                  <Entypo
                    name="check"
                    size={30}
                    color="white"
                  />
                }
              />
            </View>
            <View style={{ marginHorizontal: 15 }}>
              <CircularButton
                icon={
                  <Entypo
                    name="plus"
                    size={30}
                    color="white"
                  />
                }
              />
            </View>
          </View>
          <Text style={Styles.itemConfirmationScreen.modalContainer.subtotal}>SUBTOTAL: $120.00</Text>
        </View>
        <FlatList />
      </View>
    </LogoScreenWrapper>
  )
}

export default ItemConfirmationScreen
