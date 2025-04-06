import { BaseToast, ErrorToast } from 'react-native-toast-message'
import { View } from 'react-native'
import GoDutchIcon from '../components/ui/GoDutchIcon'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import { scaleFont } from '../utils/utils'

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.goDutchRed,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: SCREEN_HEIGHT * 0.1,
        marginTop: SCREEN_HEIGHT * 0.01,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: scaleFont(20),
        fontFamily: 'Poppins-Bold',
      }}
      text2Style={{
        fontSize: scaleFont(18),
        fontFamily: 'Poppins-Regular',
        color: COLORS.goDutchBlue,
      }}
      renderLeadingIcon={() => (
        <View style={{ marginLeft: 10 }}>
          <GoDutchIcon size={50} />
        </View>
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: COLORS.goDutchRed,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: SCREEN_HEIGHT * 0.1,
        marginTop: SCREEN_HEIGHT * 0.01,
      }}
      text1Style={{
        fontSize: scaleFont(20),
        fontFamily: 'Poppins-Bold',
        color: COLORS.goDutchRed,
      }}
      text2Style={{
        fontSize: scaleFont(18),
        fontFamily: 'Poppins-Regular',
        color: COLORS.goDutchBlue,
      }}
      renderLeadingIcon={() => (
        <View style={{ marginLeft: 10 }}>
          <GoDutchIcon size={50} />
        </View>
      )}
    />
  ),
}

export default toastConfig
