import { Text, View, TouchableOpacity } from 'react-native'
import Styles from '../../style'

const ConfirmableDinnerItemTile = ({ name, price, id, removeItem }) => {
  return (
    <View style={Styles.confirmableDinnerItemTile.container}>
      <TouchableOpacity onPress={() => removeItem(id)}>
        <Text style={Styles.confirmableDinnerItemTile.container.text}>DELETE</Text>
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={[Styles.confirmableDinnerItemTile.container.text, { fontFamily: 'Poppins-Medium' }]}
      >
        {name}
      </Text>
      <Text style={Styles.confirmableDinnerItemTile.container.text}>${price.toFixed(2) || (0.0).toFixed(2)}</Text>
    </View>
  )
}

export default ConfirmableDinnerItemTile
