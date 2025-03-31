import { View, Text, FlatList } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'

const DinerItemAssignmentScreen = () => {
  return (
    <LogoScreenWrapper>
      <View style={Styles.dinerItemAssignmentScreen.container}>
        <Text style={Styles.dinerItemAssignmentScreen.container.text}>What did this diner have?</Text>
        <Text style={Styles.dinerItemAssignmentScreen.container.text.instruction}>Drag diner items to diner icon & review!</Text>
        <ProfileImageMedallion
          height={SCREEN_HEIGHT * 0.25}
          width={SCREEN_WIDTH * 0.50}
          borderRadius={'50%'}
        />
        <Text style={Styles.dinerItemAssignmentScreen.userName}>@userName</Text>
        <PrimaryButton outterWidth={SCREEN_WIDTH *.5} innerWidth={SCREEN_WIDTH * .47}>Review</PrimaryButton>
      </View>
      <FlatList />
    </LogoScreenWrapper>
  )
}

export default DinerItemAssignmentScreen
