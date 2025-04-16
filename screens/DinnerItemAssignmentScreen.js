import { View, Text, FlatList } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { CIRCLE_SIZE, COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'


const DinnerItemAssignmentScreen = ({ route }) => {

  const { diners } = route.params

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={Styles.dinnerItemAssignmentScreen.container}>
        <Text style={Styles.dinnerItemAssignmentScreen.container.text}>What did this diner have?</Text>
        <Text style={Styles.dinnerItemAssignmentScreen.container.text.instruction}>Drag diner items to diner icon & review!</Text>
        <ProfileImageMedallion
          height={CIRCLE_SIZE * 0.5}
          width={CIRCLE_SIZE * 0.5}
          borderRadius={CIRCLE_SIZE / 2}
          imageUrl={''}
        />
        <Text style={Styles.dinnerItemAssignmentScreen.userName}>@userName</Text>
        <PrimaryButton
          outterWidth={SCREEN_WIDTH * 0.5}
          innerWidth={SCREEN_WIDTH * 0.47}
        >
          Review
        </PrimaryButton>
      </View>
      <FlatList />
    </LogoScreenWrapper>
  )
}

export default DinnerItemAssignmentScreen
