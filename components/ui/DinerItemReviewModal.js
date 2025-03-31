import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomModalContainer from './CustomModalContainer'
import Styles from '../../style'
import ProfileImageMedallion from './ProfileImageMedallion'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/constants'

const DinerItemReviewModal = () => {
  return (
    <CustomModalContainer
      buttonText1={'Return'}
      buttonText2={'Confirm'}
    >
      <View style={Styles.dinerItemReviewModal.content}>
        <Text style={Styles.dinerItemReviewModal.text.header}>Review items for</Text>
        <ProfileImageMedallion
          height={SCREEN_HEIGHT * 0.2}
          width={SCREEN_WIDTH * 0.4}
          borderRadius={'50%'}
        />
        <Text style={[Styles.dinerItemAssignmentScreen.userName, { color: COLORS.goDutchBlue }]}>@username</Text>

        <View style={{ width: SCREEN_WIDTH * 0.8 }}>
          <Text style={Styles.dinerItemReviewModal.text.instructions}>
            Select DELETE to remove an item from current diner’s bill. Press RETURN to go back to items or CONFIRM to confirm items and move to next
            diner.
          </Text>
        </View>
      </View>
    </CustomModalContainer>
  )
}

export default DinerItemReviewModal
