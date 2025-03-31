import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import PrimaryButton from '../components/ui/PrimaryButton'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import Styles from '../style'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import DinerTile from '../components/ui/DinerTile'

const DinerInputScreen = () => {
  return (
    <LogoScreenWrapper>
      <View style={{ alignItems: 'center' }}>
        <Text style={Styles.dinerInputScreen.text.event}>Event Name</Text>
        <Text style={Styles.dinerInputScreen.text.location}>Event Location</Text>
        <DinerTile />

        <View style={Styles.dinerInputScreen.inputContainer}>
          <TextInput
            placeholder="Input New Diner"
            style={Styles.dinerInputScreen.inputContainer.input}
          />
          <TouchableOpacity style={Styles.dinerInputScreen.inputContainer.search}>
            <FontAwesome5
              name="search"
              size={24}
              color={COLORS.favoritesIconBackground}
            />
          </TouchableOpacity>
        </View>
        <PrimaryButton>Add Diner</PrimaryButton>
      </View>
      <FlatList />
      <PrimaryButton
        outterWidth={SCREEN_WIDTH * 0.75}
        innerWidth={SCREEN_WIDTH * 0.7}
      >
        Confirm All Diners
      </PrimaryButton>
    </LogoScreenWrapper>
  )
}

export default DinerInputScreen
