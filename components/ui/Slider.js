import SliderItem from '../SliderItem'
import Carousel from 'react-native-snap-carousel'
import { SCREEN_WIDTH } from '../../constants/constants'

const Slider = ({ featuredRestaurants }) => {
  const renderItem = ({ item }) => {
    return (
      <SliderItem
        {...item}
        key={item.id}
      />
    )
  }
  return (
    <Carousel
      data={featuredRestaurants}
      renderItem={renderItem}
      sliderWidth={SCREEN_WIDTH}
      itemWidth={SCREEN_WIDTH}
      layout="default"
      autoplay={true}
      autoplayInterval={3000}
      loop={true}
    />
  )
}

export default Slider
