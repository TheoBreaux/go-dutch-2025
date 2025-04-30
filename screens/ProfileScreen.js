import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import Styles from '../style'
import { ASSET_URL, CIRCLE_SIZE, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import PrimaryButton from '../components/ui/PrimaryButton'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import Ionicons from '@expo/vector-icons/Ionicons'
import { scaleFont } from '../utils/utils'

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.app.user)
  const convertedDate = new Date(user.dateJoined)
  const options = { year: 'numeric', month: 'long' }
  const formattedDate = convertedDate.toLocaleDateString('en-us', options)

  console.log(user)

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
            imageUrl={ASSET_URL + user.imgUrl}
            height={CIRCLE_SIZE * 0.5}
            width={CIRCLE_SIZE * 0.5}
            borderRadius={(CIRCLE_SIZE * 0.5) / 2}
          />

          <Text style={{ fontSize: 22, fontFamily: 'Poppins-ExtraBold', marginTop: 10 }}>
            Member since:
            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium' }}> {formattedDate}</Text>
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontFamily: 'Poppins-ExtraBold' }}>{user.firstName + ' ' + user.lastName}</Text>
            <TouchableOpacity>
              <Ionicons
                name={'heart-outline'}
                size={SCREEN_WIDTH < 400 ? 30 : 40}
                color={COLORS.goDutchBlue}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: SCREEN_WIDTH * 0.9,
              marginBottom: 50,
              height: 'auto',
              borderWidth: 2,
              borderRadius: 15,
              padding: 10,
              elevation: 5,
              backgroundColor: 'white',
              borderRadius: 10,
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: scaleFont(30), fontFamily: 'Poppins-ExtraBold' }}>About</Text>
              <Text style={{ fontSize: scaleFont(20), fontFamily: 'Poppins-ExtraBold', color: COLORS.goDutchRed }}>@{user.username}</Text>
            </View>

            <Text style={{ fontSize: scaleFont(18), fontFamily: 'Poppins-Regular' }}>{user.bio}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: scaleFont(20), fontFamily: 'Poppins-ExtraBold' }}>Location: </Text>
                  <Text style={{ fontSize: scaleFont(18), fontFamily: 'Poppins-Regular' }}>{user.location}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: scaleFont(20), fontFamily: 'Poppins-ExtraBold' }}>Birthday: </Text>
                  <Text style={{ fontSize: scaleFont(18), fontFamily: 'Poppins-Regular' }}>{user.birthday}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: scaleFont(20), fontFamily: 'Poppins-ExtraBold' }}>Favorite Cuisine: </Text>
                  <Text style={{ fontSize: scaleFont(18), fontFamily: 'Poppins-Regular' }}>{user.favoriteCuisine}</Text>
                </View>
              </View>

              <PrimaryButton
                onPress={() => navigation.goBack()}
                outerWidth={SCREEN_WIDTH * 0.28}
                innerWidth={SCREEN_WIDTH * 0.26}
              >
                Return
              </PrimaryButton>
            </View>

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#555151',
                borderRadius: 5,
                padding: 10,
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                height: SCREEN_HEIGHT * 0.095,
              }}
              multiline={true}
              numberOfLines={3}
              // onChangeText={handleChangeNotes}
              // value={notes}
              placeholder="Enter your notes..."
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LogoScreenWrapper>
  )
}

export default ProfileScreen
