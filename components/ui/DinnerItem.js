import { View, Text, Switch, PanResponder, Animated, Image } from 'react-native'
import Styles from '../../style'
import Images from '../../assets/images/images'
import { COLORS } from '../../constants/constants'
import { useRef, useState } from 'react'
import { Easing } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

const DinnerItem = ({ price, name, isShared, id, onToggle }) => {
  const [showDinnerItem, setShowDinnerItem] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  const pan = useRef(new Animated.ValueXY()).current
  const scaleValue = useRef(new Animated.Value(1)).current
  const rotation = useRef(new Animated.Value(0)).current
  const isDropArea = (gesture) => gesture.moveY < 300

  let val = { x: 0, y: 0 }
  pan.addListener((value) => (val = value))

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gesture) => {
      pan.setOffset({
        x: val.x,
        y: val.y,
      })
      pan.setValue({ x: 0, y: 0 })
      setIsDragging(true) // Set dragging state to true when dragging starts
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      }
    ),
    onPanResponderRelease: (e, gesture) => {
      setIsDragging(false) // Set dragging state to false when dragging ends

      if (isDropArea(gesture)) {
        Animated.sequence([
          // 360-degree spin animation
          Animated.timing(rotation, {
            toValue: 2, // Number of spins
            duration: 300, // Duration for one spin
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          // Shrink the item
          Animated.timing(scaleValue, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: false,
          }),
          // Then run parallel animations for translation and further scaling
          Animated.parallel([
            Animated.timing(pan.x, {
              toValue: 500,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(scaleValue, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
          ]),
        ]).start(() => {
          setShowDinnerItem(false)
          //   dispatch(assignAndRemoveFoodItem({ item, dinerId }))
        })
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 3,
          useNativeDriver: false,
        }).start()
      }
    },
    isDropArea(gesture) {
      return gesture.moveY < 300
    },
  })

  const panStyle = {
    transform: pan.getTranslateTransform(),
  }

  const interpolatedRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const itemBackgroundColor = isDragging
    ? COLORS.goDutchBlue // If dragging, use blue
    : isShared
    ? COLORS.goDutchBlue // If checked, use blue
    : COLORS.goDutchRed // Otherwise, use red

  return (
    <>
      {showDinnerItem && (
        <Animated.View
          style={[
            Styles.dinnerItem.animatedContainer,
            {
              panStyle,
              transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale: scaleValue }, { rotate: interpolatedRotation }],
              backgroundColor: itemBackgroundColor,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={Styles.dinnerItem.container}>
            <View style={Styles.dinnerItem.container.switchContainer}>
              {isShared ? (
                <Ionicons
                  name="checkmark-sharp"
                  size={25}
                  color="white"
                />
              ) : (
                <Text style={Styles.dinnerItem.container.switchContainer.text}>Sharing?</Text>
              )}

              <Switch
                trackColor={{ false: '#767577', true: COLORS.goDutchBlue }}
                thumbColor={isShared ? '#b9afb0' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => onToggle()}
                value={isShared}
              />
            </View>
            <Text
              numberOfLines={1}
              style={Styles.dinnerItem.container.text.name}
            >
              {name}
            </Text>
            <Text style={Styles.dinnerItem.container.text.price}>${price.toFixed(2)}</Text>
          </View>
        </Animated.View>
      )}

      {isDragging && (
        <Animated.View
          style={[
            Styles.dinnerItem.container.handOverlay,
            {
              transform: [
                ...pan.getTranslateTransform(),
                { translateX: 90 }, // tweak these to position the hand just right
                { translateY: -5 },
              ],
            },
          ]}
        >
          <Image
            source={Images.draggable_hand}
            style={[
              Styles.dinnerItem.container.handOverlay.hand,
              {
                transform: [{ rotate: '45deg' }],
              },
            ]}
          />
        </Animated.View>
      )}
    </>
  )
}

export default DinnerItem
