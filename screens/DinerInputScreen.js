import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import PrimaryButton from '../components/ui/PrimaryButton'
import { ASSET_URL, COLORS, SCREEN_WIDTH } from '../constants/constants'
import Styles from '../style'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import DinerTile from '../components/ui/DinerTile'
import { useState, useEffect } from 'react'
import ProfileImageMedallion from '../components/ui/ProfileImageMedallion'
import { useDispatch, useSelector } from 'react-redux'
import { autoCompleteDiner } from '../state/actions/actions'

const DinerInputScreen = ({ route }) => {
  const dispatch = useDispatch()
  const suggestions = useSelector((state) => state.app.suggestions.sort((a, b) => a.username.localeCompare(b.username)))

  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showDiners, setShowDiners] = useState(true)
  const [additionalDiners, setAdditionalDiners] = useState([])

  const { primaryDiner, eventTitle, eventLocation } = route.params

  useEffect(() => {
    if (inputValue.trim().length > 1) {
      dispatch(autoCompleteDiner(inputValue))
    }
  }, [inputValue])

  console.log('SUGGESTIONS: ', suggestions)

  const handleInputChange = (text) => {
    setInputValue(text)
    setShowSuggestions(true)
    setShowDiners(false)
  }

  const renderSuggestionsItem = ({ item, index }) => (
    <DinerTile />
    // <ProfileImageMedallion
    //   image={ASSET_URL + item.imgUrl}
    //   height={60}
    //   width={60}
    //   borderRadius={30}
    // />
  )

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      <View style={{ alignItems: 'center' }}>
        <Text style={Styles.dinerInputScreen.text.event}>{eventTitle}</Text>
        <Text style={Styles.dinerInputScreen.text.location}>{eventLocation}</Text>
        <View style={{ marginBottom: 10 }}>
          <DinerTile
            primaryDiner={true}
            username={primaryDiner}
          />
        </View>

        <View style={Styles.dinerInputScreen.inputContainer}>
          <TextInput
            style={Styles.dinerInputScreen.inputContainer.input}
            onChangeText={handleInputChange}
            placeholder="Search diner name, username..."
            value={inputValue}
          />
          <TouchableOpacity style={Styles.dinerInputScreen.inputContainer.search}>
            <FontAwesome5
              name="search"
              size={24}
              color={COLORS.goDutchRed}
            />
          </TouchableOpacity>
        </View>

        <PrimaryButton>Add Diner</PrimaryButton>
      </View>

      {showDiners && (
        <>
          {/* rendering all diners to the screen */}
          <FlatList
            // data={diners}
            renderItem={({ item }) => (
              <DinerTile
                key={item.id}
                name={''}
                username={''}
                primaryDiner={false}
              />
            )}
          />

          {/* modal to confirm all diners added */}
          {/* {showMiniModal && (
            <View style={styles.miniModalContent}>
              <View>
                <Text style={[styles.miniModalText, { textAlign: 'center', marginTop: 5 }]}>All diners added?</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <PrimaryButton
                  width={150}
                  height={50}
                  onPress={allDinersAddedHandler}
                >
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          )} */}
        </>
      )}

      {showSuggestions && (
        <FlatList
          style={styles.showSuggestionsContainer}
          data={suggestions}
          renderItem={renderSuggestionsItem}
        />
      )}

      {/* <PrimaryButton
        outterWidth={SCREEN_WIDTH * 0.75}
        innerWidth={SCREEN_WIDTH * 0.7}
      >
        Confirm All Diners
      </PrimaryButton> */}
    </LogoScreenWrapper>
  )
}

export default DinerInputScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'center',
  },
  modalText: {
    fontFamily: 'red-hat-normal',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  birthdayCake: {
    marginTop: 250,
  },
  birthdaySelects: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  birthdayButtonContainer: {
    marginBottom: 245,
  },
  eventTitle: {
    textAlign: 'center',
    fontFamily: 'red-hat-bold',
    color: COLORS.goDutchRed,
    fontSize: 25,
    marginBottom: 5,
  },
  eventLocation: {
    textAlign: 'center',
    fontFamily: 'red-hat-bold',
    fontSize: 25,
    marginTop: -10,
    color: COLORS.goDutchBlue,
  },
  addDinersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'center',
    position: 'absolute',
    zIndex: 1,
    marginLeft: 5,
  },
  textInput: {
    backgroundColor: COLORS.inputBackground,
    borderBottomColor: COLORS.inputBorder,
    borderBottomWidth: 2,
    borderRadius: 5,
    padding: 14,
    paddingLeft: 50,
    width: '60%',
  },
  miniModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    marginBottom: 10,
    elevation: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniModalText: {
    fontFamily: 'red-hat-normal',
    fontSize: 25,
    textAlign: 'center',
  },
  showSuggestionsContainer: { padding: 5 },
})
