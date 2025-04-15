import { View, Image } from 'react-native'
import Images from '../../assets/images/images'
import Styles from '../../style'

const ProfileImageMedallion = ({ width, height, borderRadius, imageUrl }) => {
  return (
    <View style={[Styles.profileImageMedallion.container, { width, height, borderRadius }]}>
      <Image
        source={imageUrl ? { uri: imageUrl } : Images.default_profile_image}
        style={[Styles.profileImageMedallion.image, { width, height, borderRadius }]}
      />
    </View>
  )
}

export default ProfileImageMedallion
