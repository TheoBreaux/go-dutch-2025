import { View, Text } from 'react-native'
import Style from '../style'

const ScrollPageHeader = ({ children }) => {
  return (
    <View style={Style.scrollPageHeader.container}>
      <Text style={Style.scrollPageHeader.container.text}>{children}</Text>
    </View>
  )
}

export default ScrollPageHeader
