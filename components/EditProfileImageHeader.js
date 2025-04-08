import { TouchableOpacity, StyleSheet, Modal, View, Text } from 'react-native'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import Styles from '../style'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProfileImageMedallion from './ui/ProfileImageMedallion'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const EditProfileImageHeader = () => {
  const [image, setImage] = useState()
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
        quality: 0.8,
      })
      setImageUploadModal(false)
    } else {
      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
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
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Profile Photo</Text>

                <View style={styles.photoOptionsContainer}>
                  <TouchableOpacity>
                    <View style={styles.modalIconContainer}>
                      <MaterialCommunityIcons
                        name="camera-outline"
                        size={40}
                        color={COLORS.goDutchRed}
                        onPress={() => handlePickImage()}
                      />
                      <Text style={styles.modalOptionText}>Camera</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.modalIconContainer}>
                      <MaterialCommunityIcons
                        name="image-outline"
                        size={40}
                        color={COLORS.goDutchRed}
                        onPress={() => handlePickImage('gallery')}
                      />
                      <Text style={styles.modalOptionText}>Gallery</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.modalIconContainer}>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={40}
                        color={COLORS.goDutchRed}
                        onPress={removeImage}
                      />
                      <Text style={styles.modalOptionText}>Remove</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <ProfileImageMedallion
        height={SCREEN_HEIGHT * 0.25}
        width={SCREEN_WIDTH * 0.5}
        borderRadius={(SCREEN_WIDTH * 0.5) / 2}
        image={image}
      />

      <TouchableOpacity
        style={Styles.registrationScreen.imageContainer.icon}
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    backgroundColor: 'lightgrey',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    borderWidth: 2,
    top: 140,
    borderColor: COLORS.goDutchBlue,
    left: 260,
  },
  imageIconcontainer: {
    zIndex: 0,
    elevation: 5,
    height: 200,
    width: 200,
    position: 'relative',
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#000',
  },
  text: {
    fontFamily: 'red-hat-bold',
    fontSize: 15,
    color: 'black',
    marginTop: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(162, 164, 167, 0.563)',
    padding: 10,
    width: 80,
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    height: 200,
    width: 350,
  },
  modalText: {
    fontFamily: 'red-hat-bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  photoOptionsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modalOptionText: {
    fontFamily: 'red-hat-bold',
    fontSize: 15,
    textAlign: 'center',
  },
})

export default EditProfileImageHeader
