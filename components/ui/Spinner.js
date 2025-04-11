import { ActivityIndicator, StyleSheet, View, Text, Dimensions } from 'react-native'
import { COLORS, SCREEN_WIDTH } from '../../constants/constants'

const Spinner = ({ children, indicatorSize, fontSize }) => {
  const size = indicatorSize || 200
  const textSize = fontSize || 30

  return (
    <View style={[styles.container, { maxWidth: SCREEN_WIDTH - 40 }]}>
      <ActivityIndicator
        size={size}
        color={COLORS.goDutchRed}
      />
      <Text style={[styles.loadingText, { fontSize: textSize }]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: 'red-hat-normal',
    letterSpacing: 1,
    color: COLORS.goDutchBlue,
    textAlign: 'center',
    flexWrap: 'nowrap',
  },
})

export default Spinner
