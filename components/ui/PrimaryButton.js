import { View, Text, TouchableOpacity } from 'react-native'
import Styles from '../../style'
import { SCREEN_WIDTH } from '../../constants/constants'

const PrimaryButton = ({ children, onPress, outerWidth = SCREEN_WIDTH * 0.4, innerWidth = SCREEN_WIDTH * 0.37, margin = SCREEN_WIDTH * 0.025 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Styles.primaryButton.outerContainer, { width: outerWidth, margin }]}
    >
      <View style={[Styles.primaryButton.innerContainer, { width: innerWidth }]}>
        <Text style={Styles.primaryButton.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PrimaryButton
