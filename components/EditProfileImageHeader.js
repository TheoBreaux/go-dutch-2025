import { TouchableOpacity } from 'react-native'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import Styles from '../style'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProfileImageMedallion from './ui/ProfileImageMedallion'

const EditProfileImageHeader = () => {
  return (
    <>
      <ProfileImageMedallion
        height={SCREEN_HEIGHT * 0.25}
        width={SCREEN_WIDTH * 0.5}
        borderRadius={'50%'}
      />

      <TouchableOpacity style={Styles.registrationScreen.imageContainer.icon}>
        <MaterialCommunityIcons
          name="camera"
          size={30}
          color={COLORS.goDutchRed}
        />
      </TouchableOpacity>
    </>
  )
}

export default EditProfileImageHeader
