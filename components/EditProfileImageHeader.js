import { TouchableOpacity, Modal, View, Text } from 'react-native'
import { CIRCLE_SIZE, COLORS } from '../constants/constants'
import Styles from '../style'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProfileImageMedallion from './ui/ProfileImageMedallion'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const EditProfileImageHeader = ({ image, setImage }) => {
  const [imageUploadModal, setImageUploadModal] = useState(false)

  const checkPermissions = async () => {
    // Request permission for both media library and camera
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()

    if (mediaPermission.granted === false || cameraPermission.granted === false) {
      alert('Please grant camera and gallery permissions to proceed!')
      return false
    }
    return true
  }

  const handlePickImage = async (mode) => {
    const permissionsGranted = await checkPermissions()
    if (!permissionsGranted) return

    let result

    if (mode === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      })
      setImageUploadModal(false)
    } else if (mode === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })
      setImageUploadModal(false)
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImageUploadModal(false)
    } else {
      setImageUploadModal(false)
    }
  }

  const handleImageUpload = () => {
    setImageUploadModal(!imageUploadModal)
  }

  const saveImage = async (image) => {
    //update display image
    setImage(image)
    setImageUploadModal(false)
  }

  const removeImage = () => {
    saveImage(null)
    setImageUploadModal(false)
  }

  return (
    <>
      {imageUploadModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={imageUploadModal}
        >
          <View style={Styles.editProfileImageHeader.modalOverlay}>
            <View style={Styles.editProfileImageHeader.modalContainer}>
              <View style={Styles.editProfileImageHeader.modalContainer.modalContent}>
                <Text style={Styles.editProfileImageHeader.modalContainer.modalContent.text}>Profile Photo</Text>

                <View style={Styles.editProfileImageHeader.modalContainer.modalContent.optionsContainer}>
                  <TouchableOpacity onPress={() => handlePickImage('camera')}>
                    <View style={Styles.editProfileImageHeader.modalContainer.modalContent.modalIconContainer}>
                      <MaterialCommunityIcons
                        name="camera-outline"
                        size={40}
                        color={COLORS.goDutchRed}
                      />
                      <Text style={Styles.editProfileImageHeader.modalContainer.modalContent.modalIconContainer.text}>Camera</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePickImage('gallery')}>
                    <View style={Styles.editProfileImageHeader.modalContainer.modalContent.modalIconContainer}>
                      <MaterialCommunityIcons
                        name="image-outline"
                        size={40}
                        color={COLORS.goDutchRed}
                      />
                      <Text style={Styles.editProfileImageHeader.modalContainer.modalContent.modalIconContainer.text}>Gallery</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={removeImage}>
                    <View style={Styles.editProfileImageHeader.modalContainer.modalContent.modalIconContainer}>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={40}
                        color={COLORS.goDutchRed}
                      />
                      <Text style={Styles.editProfileImageHeader.modalContainer.modalContent.modalIconContainer.text}>Remove</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <ProfileImageMedallion
        height={CIRCLE_SIZE * 0.45}
        width={CIRCLE_SIZE * 0.45}
        borderRadius={(CIRCLE_SIZE * 0.45) / 2}
        imageUrl={image}
      />
      <TouchableOpacity
        style={Styles.signUpScreen.imageContainer.icon}
        onPress={handleImageUpload}
      >
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
