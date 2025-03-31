import { View, TouchableOpacity, Text } from 'react-native'
import Styles from '../../style'

const CircularButton = ({ icon, children }) => {
  return (
    <TouchableOpacity style={Styles.dinerTile.container.closeButtonContainer}>
      <View style={Styles.dinerTile.container.closeButtonContainer.outter} />
      <View style={Styles.dinerTile.container.closeButtonContainer.inner}>
        {icon ? icon : <Text style={Styles.dinerTile.container.closeButtonContainer.inner.text}>{children}</Text>}
      </View>
    </TouchableOpacity>
  )
}

export default CircularButton
