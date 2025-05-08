import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { ASSET_URL, COLORS, SCREEN_WIDTH } from '../constants/constants'
import FavoritesIcon from '../components/ui/FavoritesIcon'
import Images from '../assets/images/images'
import Styles from '../style'
import PrimaryButton from '../components/ui/PrimaryButton'
import { handleCallRestaurant, handleExternalLink, scaleFont } from '../utils/utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../state/actions/actions'

const RestaurantDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { item } = route.params

  const favorites = useSelector((state) => state.app.favorites)

  const isFavorite = favorites.some((favorite) => {
    return (favorite.favorited_type === 'restaurant' && Number(favorite.favorited_id) === Number(item.restaurantId)) || Number(item.restaurant_id)
  })

  return (
    <LogoScreenWrapper
      backgroundColor={COLORS.logoScreenBackground}
      useLogo={false}
    >
      <View style={{ position: 'relative' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={Styles.restaurantDetailsScreen.backButton}
        >
          <MaterialIcons
            name="arrow-back"
            size={35}
            color="white"
          />
        </TouchableOpacity>

        <Image
          source={item?.imgUrl || item?.img_url ? { uri: ASSET_URL + (item.imgUrl || item.img_url) } : Images.dining_detail}
          style={Styles.diningDetailsScreen.image}
        />

        <View style={Styles.restaurantDetailsScreen.favoritesIconContainer}>
          <FavoritesIcon
            isFavorited={isFavorite}
            onPress={() => {
              dispatch(toggleFavorite({ ...item, restaurantId: item.restaurant_id }))
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Tabs', { screen: 'Split' })}
          style={Styles.restaurantDetailsScreen.goDutchIcon}
        >
          <Image
            source={Images.go_dutch_split_button}
            style={Styles.restaurantDetailsScreen.goDutchIcon.image}
          />
        </TouchableOpacity>

        <View style={Styles.restaurantDetailsScreen.cuisineMarker}>
          <Text style={Styles.restaurantDetailsScreen.cuisineMarker.text}>{item.cuisine}</Text>
        </View>

        <View style={Styles.restaurantDetailsScreen.rating}>
          <Text style={[Styles.restaurantDetailsScreen.restaurantInfoContainer.text.name, { fontSize: scaleFont(20), color: COLORS.goDutchRed }]}>
            {item.rating}/5.0 ⭐
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[Styles.diningDetailsScreen.container, { marginTop: 10 }]}
        >
          <View style={Styles.restaurantDetailsScreen.restaurantInfoContainer}>
            <View style={{ width: '75%' }}>
              <View>
                <Text style={Styles.restaurantDetailsScreen.restaurantInfoContainer.text.name}>{item.name}</Text>
              </View>

              <Text style={[Styles.restaurantDetailsScreen.restaurantInfoContainer.text.address, { marginBottom: -5 }]}>{item.address}</Text>
              <Text style={Styles.restaurantDetailsScreen.restaurantInfoContainer.text.address}>{`${item.city}, ${item.state} ${item.zip}`}</Text>
            </View>
          </View>

          <View style={Styles.restaurantDetailsScreen.buttonsContainer}>
            <View style={{ marginRight: 20 }}>
              <PrimaryButton
                onPress={() => handleCallRestaurant(item.phone)}
                outerWidth={SCREEN_WIDTH * 0.4}
                innerWidth={SCREEN_WIDTH * 0.37}
              >
                Call
              </PrimaryButton>
            </View>

            <PrimaryButton
              onPress={() => handleExternalLink(item.website)}
              outerWidth={SCREEN_WIDTH * 0.4}
              innerWidth={SCREEN_WIDTH * 0.37}
            >
              Reserve
            </PrimaryButton>
          </View>
          <Text style={Styles.restaurantDetailsScreen.bio}>{item.bio}</Text>

          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Type your notes here..."
            style={Styles.restaurantDetailsScreen.notesContainer}
          />

          <View style={{ alignItems: 'flex-end', marginRight: -SCREEN_WIDTH * 0.025 }}>
            <PrimaryButton
              outerWidth={SCREEN_WIDTH * 0.4}
              innerWidth={SCREEN_WIDTH * 0.37}
            >
              Save
            </PrimaryButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default RestaurantDetailsScreen
