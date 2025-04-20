import { View, Text, TextInput } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Styles from '../../style'
import CircularButton from './CircularButton'
import { SCREEN_HEIGHT } from '../../constants/constants'

const TotalsInput = ({ children, value, onChangeText, onPress }) => {
  return (
    <View style={Styles.confirmTotalsScreen.container.inputContainer}>
      <View style={{ flexDirection: 'column' }}>
        <TextInput
          style={Styles.confirmTotalsScreen.container.inputContainer.textInput}
          onChangeText={onChangeText}
          keyboardType="numeric"
          value={value}
        />
        <Text style={Styles.confirmTotalsScreen.container.inputContainer.textInput.label}>{children}</Text>
      </View>
      <View style={{ marginBottom: SCREEN_HEIGHT * 0.035 }}>
        <CircularButton
          onPress={onPress}
          icon={
            <FontAwesome
              name="close"
              size={24}
              color="white"
            />
          }
        />
      </View>
    </View>
  )
}

export default TotalsInput
