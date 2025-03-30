import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import LogoScreenWrapper from '../components/LogoScreenWrapper'
import PrimaryButton from '../components/PrimaryButton'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/constants'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'

const DinerInputScreen = () => {
  return (
    <LogoScreenWrapper>
      <View style={{ alignItems: 'center' }}>
        <Text>Event Name</Text>
        <Text>Event Location</Text>
        <Text>Primary Diner:</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.goDutchRed,
            borderRadius: 10,
            width: SCREEN_WIDTH * 0.9,
            height: SCREEN_HEIGHT * 0.1,
            marginBottom: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{ borderWidth: 1, borderColor: COLORS.goDutchRed, borderRadius: 10, width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            >
              <Image />
            </View>

            <View>
              <Text>First Name</Text>
              <Text>Username</Text>
            </View>
          </View>

          <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                borderWidth: 3,
                borderColor: COLORS.goDutchBlue,
                borderRadius: 30,
                width: 60,
                height: 60,
                position: 'absolute',
              }}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.goDutchRed,
                borderRadius: 25,
                backgroundColor: COLORS.goDutchRed,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name="close-circle-outline"
                size={40}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ borderWidth: 1, borderColor: COLORS.goDutchRed, borderRadius: 10, width: SCREEN_WIDTH * 0.9 }}>
          <TextInput placeholder="Input New Diner" />
        </View>

        <PrimaryButton>Add Diner</PrimaryButton>
      </View>
      {/* <ScrollView contentContainerStyle={{ height: SCREEN_HEIGHT * 0.5 }}></ScrollView> */}
      <PrimaryButton
        outterWidth={SCREEN_WIDTH * 0.75}
        innerWidth={SCREEN_WIDTH * 0.7}
      >
        Confirm All Diners
      </PrimaryButton>
    </LogoScreenWrapper>
  )
}

export default DinerInputScreen
