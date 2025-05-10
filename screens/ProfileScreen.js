import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import { ASSET_URL, CIRCLE_SIZE, COLORS, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { scaleFont } from '../utils/utils'
import { fetchNotes, toggleFavorite, updateNotes } from '../state/actions/actions'
import FavoritesIcon from '../components/ui/FavoritesIcon'
import { Ionicons } from '@expo/vector-icons'

const ProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.app.user)
  const { item } = route.params
  const convertedDate = new Date(item.date_joined)
  const options = { year: 'numeric', month: 'long' }
  const formattedDate = convertedDate.toLocaleDateString('en-us', options)

  const [notes, setNotes] = useState('')
  const [saveButtonPressed, setSaveButtonPressed] = useState(false)

  const favorites = useSelector((state) => state.app.favorites)

  const isFavorite = favorites.some((favorite) => {
    return favorite.favorited_type === 'diner' && Number(favorite.favorited_id) === Number(item.user_id)
  })

  useEffect(() => {
    dispatch(fetchNotes({ userId: user.userId, favoritedType: 'diner', favoritedId: item.user_id }))
  }, [dispatch, user.userId, item.user_id])

  // useEffect(() => {
  //   // Find the favorite (or any object) by user_id and favorited_type
  //   const favorite = favorites.find(
  //     (fav) => Number(fav.favorited_id) === item.user_id && fav.favorited_type === 'diner'
  //   );
  
  //   // If notes exist, set them; otherwise, set empty notes
  //   if (favorite && favorite.notes) {
  //     setNotes(favorite.notes); // Set the fetched notes to the state
  //   } else {
  //     setNotes(''); // Set empty notes if no notes exist
  //   }
  // }, [favorites, item.user_id]); // Dependency array to re-run when favorites or user_id change
  

  const handleChangeNotes = (text) => {
    setNotes(text)
  }

  const handleUpdateNotes = () => {
    const trimmedNotes = notes.trim()
    if (!trimmedNotes) return // nothing to save

    setSaveButtonPressed(true)
    dispatch(updateNotes({ favoritedType: 'diner', favoritedId: item.user_id, notes: trimmedNotes, userId: user.userId }))
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={Styles.profileScreen.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <ProfileImageMedallion
            imageUrl={ASSET_URL + item.img_url}
            height={CIRCLE_SIZE * 0.5}
            width={CIRCLE_SIZE * 0.5}
            borderRadius={(CIRCLE_SIZE * 0.5) / 2}
          />
          <Text style={{ fontSize: 22, fontFamily: 'Poppins-ExtraBold', marginTop: 10 }}>
            Member since:
            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium' }}> {formattedDate}</Text>
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontFamily: 'Poppins-ExtraBold' }}>{item.first_name + ' ' + item.last_name}</Text>
            <View style={{ marginBottom: 10, marginLeft: 10 }}>
              <FavoritesIcon
                isFavorited={isFavorite}
                onPress={() => {
                  dispatch(toggleFavorite({ ...item, userId: item.user_id }))
                }}
              />
            </View>
          </View>
          <View style={Styles.profileScreen.scrollViewContainer.bioContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: scaleFont(30), fontFamily: 'Poppins-ExtraBold' }}>About</Text>
              <Text style={[Styles.profileScreen.scrollViewContainer.bioContainer.text.propertyName, { color: COLORS.goDutchRed }]}>
                @{item.username}
              </Text>
            </View>

            {item.bio && <Text style={Styles.profileScreen.scrollViewContainer.bioContainer.text}>{item.bio}</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'column' }}>
                {item.location && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={Styles.profileScreen.scrollViewContainer.bioContainer.text.propertyName}>Location: </Text>
                    <Text style={Styles.profileScreen.scrollViewContainer.bioContainer.text}>{item.location}</Text>
                  </View>
                )}

                {item.birthday && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={Styles.profileScreen.scrollViewContainer.bioContainer.text.propertyName}>Birthday: </Text>
                    <Text style={Styles.profileScreen.scrollViewContainer.bioContainer.text}>{item.birthday}</Text>
                  </View>
                )}
                {item.favorite_cuisine && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={Styles.profileScreen.scrollViewContainer.bioContainer.text.propertyName}>Favorite Cuisine: </Text>
                    <Text style={Styles.profileScreen.scrollViewContainer.bioContainer.text}>{item.favorite_cuisine}</Text>
                  </View>
                )}
              </View>
            </View>

            <TextInput
              style={Styles.profileScreen.scrollViewContainer.bioContainer.textInput}
              multiline={true}
              numberOfLines={3}
              onChangeText={handleChangeNotes}
              value={notes}
              placeholder={`Enter your notes about ${item.first_name}...`}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <PrimaryButton
                onPress={() => navigation.goBack()}
                outerWidth={SCREEN_WIDTH * 0.4}
                innerWidth={SCREEN_WIDTH * 0.38}
                margin={0}
              >
                Return
              </PrimaryButton>

              <PrimaryButton
                onPress={handleUpdateNotes}
                outerWidth={SCREEN_WIDTH * 0.4}
                innerWidth={SCREEN_WIDTH * 0.38}
                margin={0}
              >
                {saveButtonPressed ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={Styles.primaryButton.text}>Saving... </Text>
                    <Ionicons
                      name="checkmark-sharp"
                      size={20}
                      color="white"
                    />
                  </View>
                ) : (
                  'Save'
                )}
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default ProfileScreen
