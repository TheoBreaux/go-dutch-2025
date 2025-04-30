import { FlatList, View } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import ScrollPageHeader from '../components/ScrollPageHeader'
import { COLORS, SCREEN_HEIGHT } from '../constants/constants'
import DiningTile from '../components/ui/DiningTile'
import Styles from '../style'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiningHistory } from '../state/actions/actions'
import DiningDetailsModal from '../components/ui/DiningDetailsModal'

const HistoryScreen = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.app.user.userId)
  const diningEventsHistory = useSelector((state) => state.app.diningHistory)

  const [showDiningDetailsModal, setShowDiningDetailsModal] = useState(false)
  const [selectedDiningEvent, setSelectedDiningEvent] = useState(null)

  useEffect(() => {
    dispatch(fetchDiningHistory(parseFloat(userId)))
  }, [])

  const handleTilePress = (item) => {
    setSelectedDiningEvent(item)
    setShowDiningDetailsModal(true)
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      {showDiningDetailsModal && (
        <DiningDetailsModal
          showDiningDetailsModal={showDiningDetailsModal}
          diningEvent={selectedDiningEvent}
          onClose={() => setShowDiningDetailsModal(false)}
        />
      )}
      <View style={{ marginTop: -SCREEN_HEIGHT * 0.025 }}>
        <ScrollPageHeader>Tap Tile For Details</ScrollPageHeader>
      </View>

      <View style={Styles.resturantsScreen.container}>
        <FlatList
          data={diningEventsHistory}
          // keyExtractor={(item) => item.eventId}
          renderItem={({ item }) => (
            <DiningTile
              key={item.eventId}
              {...item}
              onPress={() => handleTilePress(item)}
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
