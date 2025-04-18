import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import FavoritesIcon from '../components/ui/FavoritesIcon'
import Images from '../assets/images/images'
import Styles from '../style'
import PrimaryButton from '../components/ui/PrimaryButton'
import { handleCallRestaurant, handleExternalLink } from '../utils/utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const RestaurantDetailsScreen = ({ navigation, route }) => {
  const { name, address, city, state, zip, phone, rating, cuisine, bio, image, website } = route.params

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
          source={image || Images.dining_detail}
          style={Styles.diningDetailsScreen.image}
        />

        <View style={Styles.restaurantDetailsScreen.favoritesIconContainer}>
          <FavoritesIcon />
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
        <View style={Styles.restaurantDetailsScreen.rating}>
          <Text style={[Styles.restaurantDetailsScreen.restaurantInfoContainer.text.name, { fontSize: 20 }]}>{rating}/5.0 ⭐</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[Styles.diningDetailsScreen.container, { marginTop: 10 }]}
      >
        <View style={Styles.restaurantDetailsScreen.restaurantInfoContainer}>
          <View style={{ width: '75%' }}>
            <Text style={Styles.restaurantDetailsScreen.restaurantInfoContainer.text.name}>{name}</Text>
            <Text style={[Styles.restaurantDetailsScreen.restaurantInfoContainer.text.address, { marginBottom: -5 }]}>{address}</Text>
            <Text style={Styles.restaurantDetailsScreen.restaurantInfoContainer.text.address}>{`${city}, ${state} ${zip}`}</Text>
          </View>
        </View>

        <View style={Styles.restaurantDetailsScreen.buttonsContainer}>
          <View style={{ marginRight: 20 }}>
            <PrimaryButton
              onPress={() => handleCallRestaurant(phone)}
              outerWidth={SCREEN_WIDTH * 0.4}
              innerWidth={SCREEN_WIDTH * 0.37}
            >
              Call
            </PrimaryButton>
          </View>

          <PrimaryButton
            onPress={() => handleExternalLink(website)}
            outerWidth={SCREEN_WIDTH * 0.4}
            innerWidth={SCREEN_WIDTH * 0.37}
          >
            Reserve
          </PrimaryButton>
        </View>
        <Text style={Styles.restaurantDetailsScreen.bio}>{bio}</Text>

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
    </LogoScreenWrapper>
  )
}

export default RestaurantDetailsScreen
