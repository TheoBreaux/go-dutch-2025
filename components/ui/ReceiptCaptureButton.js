import { MaterialCommunityIcons } from '@expo/vector-icons'
import Styles from '../../style'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants/constants'

const ReceiptCaptureButton = ({ onPress, backgroundColor = 'transparent' }) => {
  return (
    <TouchableOpacity
      style={[Styles.receiptCaptureScreen.button, { backgroundColor }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="camera"
        size={70}
        color={COLORS.goDutchRed}
      />
    </TouchableOpacity>
  )
}

export default ReceiptCaptureButton
