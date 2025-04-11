import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import Images from '../assets/images/images'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import ReceiptCaptureScreen from './ReceiptCaptureScreen'
import GoDutchIcon from '../components/ui/GoDutchIcon'

const SplitScreen = () => {
  const [isCapturingReceipt, setIsCapturingReceipt] = useState(false)

  return (
    <>
      {isCapturingReceipt ? (
        <ReceiptCaptureScreen
          isCapturingReceipt={isCapturingReceipt}
          setIsCapturingReceipt={setIsCapturingReceipt}
        />
      ) : (
        <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
          <View style={Styles.splitScreen.container}>
            <Text style={Styles.splitScreen.container.heading}>Tap icon to upload your receipt and add an event title.</Text>
            <Image
              source={Images.dining_detail}
              style={Styles.splitScreen.container.image}
            />
            <TouchableOpacity
              style={{ marginTop: SCREEN_HEIGHT * 0.05 }}
              onPress={() => setIsCapturingReceipt(true)}
            >
              <GoDutchIcon size={SCREEN_WIDTH < 400 ? 125 : 150} />
            </TouchableOpacity>
          </View>
        </LogoScreenWrapper>
      )}
    </>
  )
}

export default SplitScreen
