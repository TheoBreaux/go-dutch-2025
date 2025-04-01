import { FlatList, View } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import ScrollPageHeader from '../components/ScrollPageHeader'
import { RESTAURANT_DATA } from '../constants/data'
import RestaurantTile from '../components/ui/RestaurantTile'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'

const RestaurantsScreen = () => {
  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={{ marginTop: -SCREEN_HEIGHT * 0.025 }}>
        <ScrollPageHeader>Featured Restaurants</ScrollPageHeader>
      </View>

      <FlatList
        data={RESTAURANT_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RestaurantTile {...item} />}
        contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.025 }}
        showsVerticalScrollIndicator={false}
      />
    </LogoScreenWrapper>
  )
}

export default RestaurantsScreen
