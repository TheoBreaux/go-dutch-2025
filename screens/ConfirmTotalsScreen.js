import { View, Text, ScrollView } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import TotalsInput from '../components/ui/TotalsInput'
import PrimaryButton from '../components/ui/PrimaryButton'
import CircularButton from '../components/ui/CircularButton'

const ConfirmTotalsScreen = () => {
  return (
    <LogoScreenWrapper opacity={0.2}>
      <ScrollView contentContainerStyle={Styles.confirmTotalsScreen.container}>
        <Text style={Styles.confirmTotalsScreen.container.text.restaurantName}>Restaurant Name</Text>
        <TotalsInput>Subtotal</TotalsInput>
        <TotalsInput>Tax</TotalsInput>
        <TotalsInput>Tip</TotalsInput>

        <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer}>
          <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButton}>
            <CircularButton>18%</CircularButton>
            <Text style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButtonLabel}>Good</Text>
          </View>
          <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButton}>
            <CircularButton>20%</CircularButton>
            <Text style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButtonLabel}>Great!</Text>
          </View>
          <View style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButton}>
            <CircularButton>25%</CircularButton>
            <Text style={Styles.confirmTotalsScreen.container.tipButtonsContainer.tipButtonLabel}>Wow!</Text>
          </View>
        </View>
        <Text style={Styles.confirmTotalsScreen.container.text.restaurantName}>Missing fees?</Text>
        <View style={{ flexDirection: 'row' }}>
          <PrimaryButton>Yes, add fees!</PrimaryButton>
          <PrimaryButton>No, confirm!</PrimaryButton>
        </View>
      </ScrollView>
    </LogoScreenWrapper>
  )
}

export default ConfirmTotalsScreen
