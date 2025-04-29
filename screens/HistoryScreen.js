import { FlatList, View } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import ScrollPageHeader from '../components/ScrollPageHeader'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import DiningTile from '../components/ui/DiningTile'
import Styles from '../style'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiningHistory } from '../state/actions/actions'

const HistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.app.user.userId)
  const diningEventsHistory = useSelector((state) => state.app.diningHistory)

  console.log(diningEventsHistory)

  useEffect(() => {
    dispatch(fetchDiningHistory(parseFloat(userId)))
  }, [])

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={{ marginTop: -SCREEN_HEIGHT * 0.025 }}>
        <ScrollPageHeader>Tap Tile For Details</ScrollPageHeader>
      </View>

      <View style={Styles.resturantsScreen.container}>
        <FlatList
          data={diningEventsHistory}
          keyExtractor={(item) => item.eventId.toString()}
          renderItem={({ item }) => (
            <DiningTile
              {...item}
              onPress={() => {
                navigation.navigate('Screens', { screen: 'CheckClose', params: {} })
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.025 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LogoScreenWrapper>
  )
}

export default HistoryScreen
