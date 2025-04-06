import { FlatList, View } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import ScrollPageHeader from '../components/ScrollPageHeader'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import { DINING_HISTORY } from '../constants/data'
import DiningTile from '../components/ui/DiningTile'
import Styles from '../style'

const HistoryScreen = () => {
  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={{ marginTop: -SCREEN_HEIGHT * 0.025 }}>
        <ScrollPageHeader>Tap Tile For Details</ScrollPageHeader>
      </View>

      <View style={Styles.resturantsScreen.container}>
        <FlatList
          data={DINING_HISTORY}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DiningTile {...item} />}
          contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.025 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LogoScreenWrapper>
  )
}

export default HistoryScreen
