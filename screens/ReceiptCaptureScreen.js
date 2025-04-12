import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import { useState, useRef } from 'react'
import { Camera, CameraView, useCameraPermissions } from 'expo-camera'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import { CameraType } from 'expo-image-picker'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import Styles from '../style'
import ReceiptCaptureButton from '../components/ui/ReceiptCaptureButton'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { handleReceiptParse } from '../utils/utils'
import ReceiptAnalyzingScreen from './ReceiptAnalyzingScreen'

const ReceiptCaptureScreen = ({ setIsCapturingReceipt }) => {
  const [facing, setFacing] = useState(CameraType.back)
  const [permission, requestPermission] = useCameraPermissions()
  const [flashOn, setFlashOn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)

  const cameraRef = useRef(null)

  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{}}>
        <Text style={{}}>We need your permission to show the camera</Text>
        <Button
          onPress={requestPermission}
          title="grant permission"
        />
      </View>
    )
  }

  const captureReceipt = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync()
        setImage(data.uri)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleReceiptData = async () => {
    setLoading(true)
    const data = await handleReceiptParse(image)
    console.log(data)
    setLoading(false)
  }

  return loading ? (
    <ReceiptAnalyzingScreen />
  ) : (
    <CameraView
      style={Styles.receiptCaptureScreen.cameraView}
      facing={facing}
      ref={cameraRef}
      enableTorch={flashOn}
    >
      <View style={Styles.receiptCaptureScreen.cameraView.header} />
      <View style={Styles.receiptCaptureScreen.cameraView.iconsContainer}>
        <View style={Styles.receiptCaptureScreen.cameraView.panel} />

        <View style={[Styles.receiptCaptureScreen.captureArea, { paddingVertical: !image ? SCREEN_HEIGHT * 0.025 : null }]}>
          {!image && (
            <View style={Styles.receiptCaptureScreen.captureArea.container}>
              <TouchableOpacity onPress={() => setIsCapturingReceipt(false)}>
                <AntDesign
                  name="closecircle"
                  size={40}
                  color={COLORS.goDutchRed}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setFlashOn((prev) => !prev)}
                style={{
                  flexDirection: 'row',
                }}
              >
                {flashOn ? (
                  <MaterialIcons
                    name="flash-off"
                    size={40}
                    color={COLORS.goDutchRed}
                  />
                ) : (
                  <MaterialIcons
                    name="flash-on"
                    size={40}
                    color={COLORS.goDutchRed}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}

          <View style={{ alignItems: 'center' }}>
            {image ? (
              <View style={{ position: 'relative' }}>
                <Image
                  source={{ uri: image }}
                  style={Styles.receiptCaptureScreen.capturedImageContainer}
                />

                <View style={Styles.receiptCaptureScreen.capturedImageContainer.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => setImage(null)}
                    style={Styles.receiptCaptureScreen.capturedImageContainer.buttonContainer.iconContainer}
                  >
                    <FontAwesome
                      name="thumbs-down"
                      size={50}
                      color={COLORS.goDutchRed}
                    />
                    <Text style={Styles.receiptCaptureScreen.capturedImageContainer.buttonContainer.iconContainer.text}>Retake</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleReceiptData}
                    style={Styles.receiptCaptureScreen.capturedImageContainer.buttonContainer.iconContainer}
                  >
                    <FontAwesome
                      name="thumbs-up"
                      size={50}
                      color={COLORS.goDutchRed}
                    />
                    <Text style={Styles.receiptCaptureScreen.capturedImageContainer.buttonContainer.iconContainer.text}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ReceiptCaptureButton
                onPress={captureReceipt}
                backgroundColor="#00000066"
              />
            )}
          </View>
        </View>

        <View style={Styles.receiptCaptureScreen.cameraView.panel} />
      </View>
    </CameraView>
  )
}

export default ReceiptCaptureScreen
