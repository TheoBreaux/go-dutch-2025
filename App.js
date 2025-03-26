import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Text, View } from 'react-native'
import SplashScreen from './screens/SplashScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { navigationRef } from './utils/RootNavigation'
import ProfileScreen from './screens/ProfileScreen'
import SplitScreen from './screens/SplitScreen'
import HomeScreen from './screens/HomeScreen'
import RestaurantsScreen from './screens/RestaurantsScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import HistoryScreen from './screens/HistoryScreen'
import RegistrationScreen from './screens/RegistrationScreen'
import WelcomeScreen from './screens/WelcomeScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="Split"
        component={SplitScreen}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
    </Tab.Navigator>
  )
}

const ScreensNavigator = () => {
  return (
    <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />

      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  )
}

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    })
    setFontsLoaded(true)
  }

  loadFonts()

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          style="light"
          backgroundColor="black"
        />
        <Stack.Navigator>
          <Stack.Screen
            name="Screens"
            component={ScreensNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
