import { BaseToast, ErrorToast } from 'react-native-toast-message'
import { View } from 'react-native'
import GoDutchIcon from '../components/ui/GoDutchIcon'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.goDutchRed,
        flexDirection: 'row', // Ensures icon and text are in a row
        alignItems: 'center', // Centers the content vertically
        justifyContent: 'center',
        height: SCREEN_HEIGHT * 0.1, // Increase height for bigger modal
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
      }}
      text2Style={{
        fontSize: 18,
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
        flexDirection: 'row', // Ensures icon and text are in a row
        alignItems: 'center', // Centers the content vertically
        justifyContent: 'center',
        height: SCREEN_HEIGHT * 0.1, // Increase height for bigger modal
      }}
      text1Style={{
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
      }}
      text2Style={{
        fontSize: 18,
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
