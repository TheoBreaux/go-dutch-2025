import { View, Text, FlatList } from 'react-native'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'

const CelebrationSelectionModal = () => {
  return (
    <CustomModalContainer
      buttonText1={'Return'}
      buttonText2={'Confirm'}
    >
      <Text style={Styles.customModalContainer.text}>Select who we're celebrating!</Text>
    </CustomModalContainer>
  )
}

export default CelebrationSelectionModal
