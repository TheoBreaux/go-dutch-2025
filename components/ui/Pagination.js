import { View, Animated } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH } from '../../constants/constants'
import Styles from '../../style'

const Pagination = ({ featuredRestaurants, scrollX }) => {
  return (
    <View style={Styles.homeScreen.sliderItem.pagination}>
      {featuredRestaurants.map((_, index) => {
        const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH]

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        })

        return (
          <Animated.View
            key={index.toString()}
            style={[Styles.homeScreen.sliderItem.pagination.dot, { width: dotWidth }]}
          />
        )
      })}
    </View>
  )
}

export default Pagination
