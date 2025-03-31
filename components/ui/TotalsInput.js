import { View, Text, TextInput } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Styles from '../../style'
import CircularButton from './CircularButton'

const TotalsInput = ({ children }) => {
  return (
    <View style={Styles.confirmTotalsScreen.container.inputContainer}>
      <View style={{ flexDirection: 'column' }}>
        <TextInput style={Styles.confirmTotalsScreen.container.inputContainer.textInput} />
        <Text style={Styles.confirmTotalsScreen.container.inputContainer.textInput.label}>{children}</Text>
      </View>
      <CircularButton
        icon={
          <FontAwesome
            name="close"
            size={24}
            color="white"
          />
        }
      />
    </View>
  )
}

export default TotalsInput
