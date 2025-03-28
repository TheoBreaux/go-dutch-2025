import { View, Text, FlatList } from 'react-native'
import { RESTAURANT_DATA } from '../constants/data'
import SliderItem from './SliderItem'

const Slider = () => {
  return (
    <View>
      <FlatList
        data={RESTAURANT_DATA}
        renderItem={({ item, index }) => (
          <SliderItem
            {...item}
            index={index}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  )
}

export default Slider
