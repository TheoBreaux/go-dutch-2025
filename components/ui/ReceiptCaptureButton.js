import { MaterialCommunityIcons } from '@expo/vector-icons'
import Styles from '../../style'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants/constants'

const ReceiptCaptureButton = ({ onPress, backgroundColor = 'transparent', size }) => {
  return (
    <TouchableOpacity
      style={[Styles.receiptCaptureScreen.button, { backgroundColor }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="camera"
        size={size}
        color={COLORS.goDutchRed}
      />
    </TouchableOpacity>
  )
}

export default ReceiptCaptureButton
