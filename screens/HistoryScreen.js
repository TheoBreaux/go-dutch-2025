import { FlatList, View } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import ScrollPageHeader from '../components/ScrollPageHeader'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import { DINING_HISTORY } from '../constants/data'
import DiningTile from '../components/ui/DiningTile'

const HistoryScreen = () => {
  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View>
        <ScrollPageHeader>Tap Tile For Details</ScrollPageHeader>
      </View>
      <FlatList
        data={DINING_HISTORY}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DiningTile {...item} />}
        contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.025 }}
        showsVerticalScrollIndicator={false}
      />
    </LogoScreenWrapper>
  )
}

export default HistoryScreen
