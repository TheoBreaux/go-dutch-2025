import { View, Text, TextInput, ScrollView } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import PrimaryButton from '../components/PrimaryButton'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'

const DinerInputScreen = () => {
  return (
    <LogoScreenWrapper>
      <View style={{ alignItems: 'center' }}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.goDutchRed,
            borderRadius: 10,
            width: SCREEN_WIDTH * 0.9,
            height: SCREEN_HEIGHT * 0.1,
            marginBottom: 30,
          }}
        ></View>

        <View style={{ borderWidth: 1, borderColor: COLORS.goDutchRed, borderRadius: 10, width: SCREEN_WIDTH * 0.9 }}>
          <TextInput placeholder="Input New Diner" />
        </View>

        <PrimaryButton>Add Diner</PrimaryButton>
      </View>
      {/* <ScrollView contentContainerStyle={{ height: SCREEN_HEIGHT * 0.5 }}></ScrollView> */}
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
