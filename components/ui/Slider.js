import SliderItem from '../SliderItem'
import { FlatList, Animated } from 'react-native'
import Pagination from './Pagination'
import { useRef } from 'react'

const Slider = ({ featuredRestaurants }) => {
  const scrollX = useRef(new Animated.Value(0)).current

  const renderItem = ({ item }) => {
    return (
      <SliderItem
        item={item}
        {...item}
        key={item.id}
      />
    )
  }

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      { useNativeDriver: false }
    )(event)
  }

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={featuredRestaurants}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        onScroll={handleOnScroll}
      />
      <Pagination
        featuredRestaurants={featuredRestaurants}
        scrollX={scrollX}
      />
    </>
  )
}

export default Slider
