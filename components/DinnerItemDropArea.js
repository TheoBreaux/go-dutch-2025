import { View, Text, Image } from 'react-native'
import Styles from '../style'
import Images from '../assets/images/images'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { ASSET_URL, CIRCLE_SIZE, COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import { PRETTIFY } from '../utils/utils'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DinerItemReviewModal from '../components/ui/DinerItemReviewModal'
import { useNavigation } from '@react-navigation/native'

const DinnerItemDropArea = ({ diners }) => {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [dinerReviewedItems, setDinerReviewedItems] = useState([])
  const [currentDinerIndex, setCurrentDinerIndex] = useState(0)
  const [notSure, setNotSure] = useState(false)

  const navigation = useNavigation()

  const currentDiner = diners[currentDinerIndex].username

  console.log(currentDiner)

  useEffect(() => {
    // Force re-render when diner changes
  }, [diners[currentDinerIndex].imgUrl])

  const handleAssignedItemsReview = () => {
    setDinerReviewedItems()
    setShowReviewModal(true)
  }

  const handleNextDiner = () => {
    setNotSure(false)
    const currentDiner = dinersUpdated[currentDinerIndex]
    const currentDinerId = currentDiner.id
    setShowConfirmationModal(false)
  }

  const handleNoConfirmation = () => {
    setNotSure(true)
    setShowConfirmationModal(false)
    setCurrentDinerIndex((prevIndex) => prevIndex - 1) // Move back to the previous diner
    setDinerReviewedItems([]) // Reset reviewed items
  }

  return (
    <View style={Styles.dinnerItemAssignmentScreen.container}>
      <Text style={Styles.dinnerItemAssignmentScreen.container.text}>What did this diner have?</Text>
      <Text style={Styles.dinnerItemAssignmentScreen.container.text.instruction}>Press and drag items to diner!</Text>
      <ProfileImageMedallion
        height={CIRCLE_SIZE * 0.4}
        width={CIRCLE_SIZE * 0.4}
        borderRadius={(CIRCLE_SIZE * 0.4) / 2}
        imageUrl={ASSET_URL + diners[currentDinerIndex].imgUrl}
      />

      <View style={{ alignItems: 'center' }}>
        <Text style={Styles.dinnerItemAssignmentScreen.container.userName}>@{currentDiner}</Text>
        {notSure && (
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Image source={Images.down_arrow} />
            <Image source={Images.down_arrow} />
            <Image source={Images.down_arrow} />
          </View>
        )}

        <PrimaryButton
          outterWidth={SCREEN_WIDTH * 0.4}
          innerWidth={SCREEN_WIDTH * 0.38}
          onPress={() => {}}
        >
          Review
        </PrimaryButton>
      </View>
    </View>
  )
}

export default DinnerItemDropArea
