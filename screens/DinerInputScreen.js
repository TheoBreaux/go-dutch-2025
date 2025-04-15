import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import PrimaryButton from '../components/ui/PrimaryButton'
import { COLORS, SCREEN_WIDTH } from '../constants/constants'
import Styles from '../style'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import DinerTile from '../components/ui/DinerTile'

const DinerInputScreen = ({ route }) => {
  const [additionalDiners, setAdditionalDiners] = useState([])
  const { primaryDiner, eventTitle, eventLocation } = route.params

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={{ alignItems: 'center' }}>
        <Text style={Styles.dinerInputScreen.text.event}>{eventTitle}</Text>
        <Text style={Styles.dinerInputScreen.text.location}>{eventLocation}</Text>
        <View style={{ marginBottom: 10 }}>
          <DinerTile
            primaryDiner={true}
            name={primaryDiner}
          />
        </View>

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
      {/* <FlatList data={additionalDiners} /> */}
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
