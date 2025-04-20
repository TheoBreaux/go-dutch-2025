import { View, Text, Animated, Alert } from 'react-native'
import Styles from '../style'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { ASSET_URL, CIRCLE_SIZE, COLORS, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import { scaleFont } from '../utils/utils'
import { useEffect, useState } from 'react'
import DinerItemReviewModal from '../components/ui/DinerItemReviewModal'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const DinnerItemDropArea = ({ finalDiners, setCurrentDinerIndex, currentDinerIndex, setReceiptItems, setFinalDiners, receiptItems }) => {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [dinerItemsToReview, setDinerItemsToReview] = useState([])
  const swipeAnim = useState(new Animated.Value(0))[0] // Y-position
  const fadeAnim = useState(new Animated.Value(1))[0] // Opacity
  const [showSwipeHint, setShowSwipeHint] = useState(true)

  const currentDiner = finalDiners[currentDinerIndex]

  useEffect(() => {
    if (receiptItems.length) {
      // Phase 1: quick upward movement
      Animated.timing(swipeAnim, {
        toValue: -SCREEN_HEIGHT * 0.25,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        // Phase 2: fade out slowly after a pause

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800, // ⏳ longer fade duration
          useNativeDriver: true,
        }).start(() => {
          setShowSwipeHint(false)
        })
      })
    }
  }, [])

  const handleAssignedItemsReview = () => {
    //if there are items in teh receipt items and we are at the last diner, do not let progress alert about items left and no one to cover them
    if (receiptItems.length && finalDiners[finalDiners.length - 1].userId === currentDiner.userId) {
      Alert.alert(
        'Items remainin!',
        `Please assign remaining items to @${finalDiners[finalDiners.length - 1].username} to proceed.`,
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: true }
      )
    } else {
      setDinerItemsToReview(currentDiner.items)
      setShowReviewModal(true)
    }
  }

  return (
    <>
      {showReviewModal && (
        <DinerItemReviewModal
          finalDiners={finalDiners}
          currentDiner={currentDiner}
          currentDinerIndex={currentDinerIndex}
          setCurrentDinerIndex={setCurrentDinerIndex}
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
      {}
      <View style={Styles.dinnerItemAssignmentScreen.container}>
        <Text style={Styles.dinnerItemAssignmentScreen.container.text}>What did this diner have?</Text>
        <Text style={Styles.dinnerItemAssignmentScreen.container.text.instruction}>Press and drag items to diner!</Text>

        <View style={{ position: 'relative' }}>
          {showSwipeHint && (
            <Animated.View
              style={[
                Styles.dinnerItemAssignmentScreen.container.swipeHint,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: swipeAnim }],
                },
              ]}
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
          <Text style={Styles.dinnerItemAssignmentScreen.container.username}>@{currentDiner.username}</Text>
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
