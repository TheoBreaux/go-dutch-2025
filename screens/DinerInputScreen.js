import { View, Text, TextInput, FlatList } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import PrimaryButton from '../components/ui/PrimaryButton'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import Styles from '../style'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import DinerTile from '../components/ui/DinerTile'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { autoCompleteDiner } from '../state/actions/actions'
import SuggestionItem from '../components/ui/SuggestionItem'
import Toast from 'react-native-toast-message'
import CelebrationModal from '../components/ui/CelebrationModal'
import CelebrationSelectionModal from '../components/ui/CelebrationSelectionModal'

const DinerInputScreen = ({ route, navigation }) => {
  const { primaryDiner, eventTitle, eventLocation } = route.params

  const dispatch = useDispatch()
  const suggestions = useSelector((state) => state.app.suggestions.sort((a, b) => a.username.localeCompare(b.username)))

  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showAllDiners, setShowAllDiners] = useState(true)
  const [showCelebrationModal, setShowCelebrationModal] = useState(false)
  const [showSelectionModal, setShowSelectionModal] = useState(false)
  const [diners, setDiners] = useState([])

  useEffect(() => {
    if (inputValue.trim().length > 1) {
      dispatch(autoCompleteDiner(inputValue))
    }
  }, [inputValue])

  const handleInputChange = (text) => {
    setInputValue(text)
    setShowSuggestions(true)
  }

  const handleAddDiner = (dinerId) => {
    setInputValue('')
    const doesDinerExist = diners.some((diner) => diner.userId === dinerId)
    const isPrimaryDiner = dinerId === primaryDiner.userId

    if (doesDinerExist || isPrimaryDiner) {
      Toast.show({
        type: 'error',
        text1: 'Diner already exists.',
        position: 'top',
        visibilityTime: 2500,
      })
      setShowSuggestions(false)
    } else {
      const newDiner = suggestions[0]
      setDiners((prev) => [...prev, newDiner])
    }
  }

  const handleRemoveDiner = (dinerId) => {
    const updatedDiners = diners.filter((diner) => diner.userId !== dinerId)
    setDiners(updatedDiners)
  }

  const handleDinersConfirmed = () => {
    const finalUpdatedDiners = [...diners, primaryDiner]
    setDiners(finalUpdatedDiners)
    setShowCelebrationModal(true)
  }

  const renderSuggestionsItem = ({ item, index }) => (
    <SuggestionItem
      imgUrl={item.imgUrl}
      firstName={item.firstName}
      lastName={item.lastName}
      username={item.username}
      onPress={() => handleAddDiner(item.userId)}
    />
  )

  const renderDiner = ({ item }) => {
    return (
      <DinerTile
        additionalDiner={true}
        firstName={item.firstName}
        lastName={item.lastName}
        username={item.username}
        imgUrl={item.imgUrl}
        onPress={() => handleRemoveDiner(item.userId)}
      />
    )
  }

  return (
    <LogoScreenWrapper backgroundColor={COLORS.logoScreenBackground}>
      {showCelebrationModal && (
        <CelebrationModal
          onPress1={() => setShowSelectionModal(true)}
          onPress2={() => navigation.navigate('Screens', { screen: 'ItemAssignment', params: { diners } })}
        />
      )}
      {showSelectionModal && (
        <CelebrationSelectionModal
          diners={diners}
          setShowSelectionModal={setShowSelectionModal}
          setShowCelebrationModal={setShowCelebrationModal}
        />
      )}

      <View style={Styles.dinerInputScreen.container}>
        <Text style={Styles.dinerInputScreen.text.event}>{eventTitle}</Text>
        <Text style={Styles.dinerInputScreen.text.location}>{eventLocation}</Text>
        <View style={{ marginBottom: 10 }}>
          <DinerTile
            primaryDiner={true}
            firstName={primaryDiner.firstName}
            lastName={primaryDiner.lastName}
            username={primaryDiner.username}
            imgUrl={primaryDiner.imgUrl}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={Styles.dinerInputScreen.inputContainer}>
          <TextInput
            style={Styles.dinerInputScreen.inputContainer.input}
            onChangeText={handleInputChange}
            placeholder="Search diner name, username..."
            value={inputValue}
          />

          <View style={Styles.dinerInputScreen.inputContainer.search}>
            <FontAwesome5
              name="search"
              size={24}
              color={COLORS.goDutchRed}
            />
          </View>
        </View>

        {showSuggestions && inputValue.trim().length > 1 && suggestions.length > 0 && (
          <View>
            <FlatList
              data={suggestions}
              renderItem={renderSuggestionsItem}
              keyExtractor={(item) => item.id?.toString() || item.username}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {showAllDiners && (
          <FlatList
            style={{ height: SCREEN_HEIGHT * 0.25 }}
            data={diners}
            renderItem={renderDiner}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={Styles.dinerInputScreen.miniModal}>
          <Text style={Styles.dinerInputScreen.miniModal.text}>All diners added?</Text>
          <PrimaryButton
            outterWidth={SCREEN_WIDTH * 0.45}
            innerWidth={SCREEN_WIDTH * 0.42}
            onPress={handleDinersConfirmed}
          >
            Confirm
          </PrimaryButton>
        </View>
      </View>
    </LogoScreenWrapper>
  )
}

export default DinerInputScreen
