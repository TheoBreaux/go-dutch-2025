import { View, Text, TouchableOpacity } from 'react-native'
import Style from '../../style'
import { SCREEN_WIDTH } from '../../constants/constants'

const PrimaryButton = ({ children, onPress, outterWidth = SCREEN_WIDTH * 0.4, innerWidth = SCREEN_WIDTH * 0.37 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Style.primaryButton.outterContainer, { width: outterWidth }]}
    >
      <View style={[Style.primaryButton.innerContainer, { width: innerWidth }]}>
        <Text style={Style.primaryButton.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PrimaryButton
