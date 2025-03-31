import { View, Image } from 'react-native'
import Images from '../../assets/images/images'
import Styles from '../../style'

const ProfileImageMedallion = ({ width, height, borderRadius }) => {
  return (
    <View style={[Styles.profileImageMedallion.container, { width, height, borderRadius }]}>
      <Image
        source={Images.user_placeholder_image}
        style={[Styles.profileImageMedallion.container.image, { width, height }]}
      />
    </View>
  )
}

export default ProfileImageMedallion
