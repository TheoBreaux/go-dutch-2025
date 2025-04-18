import { View, Text, Image, Animated } from 'react-native'
import Styles from '../style'
import Images from '../assets/images/images'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { ASSET_URL, CIRCLE_SIZE, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import { PRETTIFY, scaleFont } from '../utils/utils'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DinerItemReviewModal from '../components/ui/DinerItemReviewModal'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const DinnerItemDropArea = ({ finalDiners, currentDinerIndex, setReceiptItems, setFinalDiners, receiptItems }) => {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [dinerItemsToReview, setDinerItemsToReview] = useState([])
  const [notSure, setNotSure] = useState(false)
  const swipeAnim = useState(new Animated.Value(0))[0] // Y-position
  const fadeAnim = useState(new Animated.Value(1))[0] // Opacity
  const [showSwipeHint, setShowSwipeHint] = useState(true)

  const navigation = useNavigation()
  const currentDiner = finalDiners[currentDinerIndex]

  useEffect(() => {
    if (receiptItems.length > 5) {
      // Phase 1: quick upward movement
      Animated.timing(swipeAnim, {
        toValue: -120,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        // Phase 2: fade out slowly after a pause

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700, // ⏳ longer fade duration
          useNativeDriver: true,
        }).start(() => {
          setShowSwipeHint(false)
        })
      })
    }
  }, [])

  const handleAssignedItemsReview = () => {
    setDinerItemsToReview(currentDiner.items)
    setShowReviewModal(true)
  }

  // console.log(finalDiners, 'IN DINNER ITEM DROP AREA')

  // useEffect(() => {
  //   // Force re-render when diner changes
  // }, [finalDiners[currentDinerIndex].imgUrl])

  // const handleNextDiner = () => {
  //   setNotSure(false)
  //   const currentDiner = dinersUpdated[currentDinerIndex]
  //   const currentDinerId = currentDiner.id
  //   setShowConfirmationModal(false)
  // }

  // const handleNoConfirmation = () => {
  //   setNotSure(true)
  //   setShowConfirmationModal(false)
  //   setCurrentDinerIndex((prevIndex) => prevIndex - 1) // Move back to the previous diner
  //   setDinerReviewedItems([]) // Reset reviewed items
  // }

  return (
    <>
      {showReviewModal && (
        <DinerItemReviewModal
          currentDiner={currentDiner}
          setShowReviewModal={setShowReviewModal}
          dinerItemsToReview={dinerItemsToReview}
          setDinerItemsToReview={setDinerItemsToReview}
          setReceiptItems={setReceiptItems}
          updateFinalDinerItems={(newItems) => {
            // Update the actual diner's items in finalDiners
            const updated = finalDiners.map((diner, index) => (index === currentDinerIndex ? { ...diner, items: newItems } : diner))
            // This assumes setFinalDiners is accessible here
            setFinalDiners(updated)
          }}
        />
      )}
      <View style={Styles.dinnerItemAssignmentScreen.container}>
        <Text style={Styles.dinnerItemAssignmentScreen.container.text}>What did this diner have?</Text>
        <Text style={Styles.dinnerItemAssignmentScreen.container.text.instruction}>Press and drag items to diner!</Text>

        <View style={{ position: 'relative' }}>
          {showSwipeHint && (
            <Animated.View
              style={{
                position: 'absolute',
                top: 150,
                left: -100,
                alignItems: 'center',
                opacity: fadeAnim,
                transform: [{ translateY: swipeAnim }],
              }}
            >
              <MaterialIcons
                name="swipe-up"
                size={60}
                color={COLORS.goDutchBlue}
              />
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: scaleFont(20) }}>Swipe up!</Text>
            </Animated.View>
          )}

          <ProfileImageMedallion
            height={CIRCLE_SIZE * 0.4}
            width={CIRCLE_SIZE * 0.4}
            borderRadius={(CIRCLE_SIZE * 0.4) / 2}
            imageUrl={ASSET_URL + finalDiners[currentDinerIndex].imgUrl}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={Styles.dinnerItemAssignmentScreen.container.userName}>@{currentDiner.username}</Text>
          {notSure && (
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Image source={Images.down_arrow} />
              <Image source={Images.down_arrow} />
              <Image source={Images.down_arrow} />
            </View>
          )}

          <PrimaryButton
            outerWidth={SCREEN_WIDTH * 0.4}
            innerWidth={SCREEN_WIDTH * 0.38}
            onPress={handleAssignedItemsReview}
          >
            Review
          </PrimaryButton>
        </View>
      </View>
    </>
  )
}

export default DinnerItemDropArea
