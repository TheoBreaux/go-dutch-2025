import { View, Text, Switch } from 'react-native'
import Styles from '../../style'
import { ASSET_URL, CIRCLE_SIZE, COLORS } from '../../constants/constants'
import ProfileImageMedallion from './ProfileImageMedallion'

const CelebratedDinerSwitch = ({ imgUrl, lastName, firstName, username, onToggle, isChecked }) => {
  return (
    <View style={Styles.celebratedDinerSwitch.container}>
      <View style={{ flexDirection: 'row' }}>
        <ProfileImageMedallion
          height={CIRCLE_SIZE * 0.2}
          width={CIRCLE_SIZE * 0.2}
          imageUrl={ASSET_URL + imgUrl}
        />

        <View style={{ justifyContent: 'center' }}>
          <Text style={Styles.celebratedDinerSwitch.container.text.name}>{firstName + ' ' + lastName}</Text>
          <Text style={Styles.celebratedDinerSwitch.container.text.username}>{'@' + username}</Text>
        </View>
      </View>

      <View style={Styles.celebratedDinerSwitch.container.switch}>
        <Text style={Styles.celebratedDinerSwitch.container.switch.text}>{isChecked ? 'Yes' : 'No'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: COLORS.goDutchBlue }}
          thumbColor={isChecked ? COLORS.goDutchRed : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onToggle}
          value={isChecked}
        />
      </View>
    </View>
  )
}

export default CelebratedDinerSwitch
