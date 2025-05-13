import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Text, View } from 'react-native'
import * as Font from 'expo-font'
import CustomSplashScreen from './screens/CustomSplashScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { navigationRef } from './utils/RootNavigation'
import ProfileScreen from './screens/ProfileScreen'
import SplitScreen from './screens/SplitScreen'
import HomeScreen from './screens/HomeScreen'
import RestaurantsScreen from './screens/RestaurantsScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import HistoryScreen from './screens/HistoryScreen'
import SignUpScreen from './screens/SignUpScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import { useDisableBackButton } from './utils/utils'
import { COLORS } from './constants/constants'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import GoDutchIcon from './components/ui/GoDutchIcon'
import Style from './style'
import DiningDetailScreen from './screens/DiningDetailScreen'
import DinerInputScreen from './screens/DinerInputScreen'
import ItemConfirmationScreen from './screens/ItemConfirmationScreen'
import DinnerItemAssignmentScreen from './screens/DinnerItemAssignmentScreen'
import ConfirmTotalsScreen from './screens/ConfirmTotalsScreen'
import RestaurantDetailsScreen from './screens/RestaurantDetailsScreen'
import Toast from 'react-native-toast-message'
import toastConfig from './config/toastConfig'
import store from './state/store'
import ReceiptCaptureScreen from './screens/ReceiptCaptureScreen'
import CheckCloseOutDetailsScreen from './screens/CheckCloseOutDetailsScreen'
import SettingsScreen from './screens/SettingsScreen'
import SplitPurchaseScreen from './screens/SplitPurchaseScreen'
import * as Notifications from 'expo-notifications'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// const store = configureStore()

const Tabs = () => {
  //disable back button on android devices
  useDisableBackButton()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: Style.tabBar.tabBarStyle,
        tabBarLabelStyle: Style.tabBar.tabBarLabelStyle,
        tabBarActiveBackgroundColor: COLORS.goDutchRed,
        tabBarItemStyle: Style.tabBar.tabBarItemStyle,
        tabBarIconStyle: { marginTop: 5 },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="heart"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Split"
        component={SplitScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <GoDutchIcon
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="history"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dine"
        component={RestaurantsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="restaurant"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-sharp"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const ScreensNavigator = () => {
  return (
    <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="DiningDetail"
        component={DiningDetailScreen}
      />
      <Stack.Screen
        name="LogIn"
        component={LoginScreen}
      />
      <Stack.Screen
        name="ItemConfirmation"
        component={ItemConfirmationScreen}
      />
      <Stack.Screen
        name="ItemAssignment"
        component={DinnerItemAssignmentScreen}
      />
      <Stack.Screen
        name="ConfirmTotals"
        component={ConfirmTotalsScreen}
      />
      <Stack.Screen
        name="DinerInput"
        component={DinerInputScreen}
      />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetailsScreen}
      />
      <Stack.Screen
        name="ReceiptCapture"
        component={ReceiptCaptureScreen}
      />
      <Stack.Screen
        name="CheckClose"
        component={CheckCloseOutDetailsScreen}
      />
      <Stack.Screen
        name="PurchaseSplits"
        component={SplitPurchaseScreen}
      />
    </Stack.Navigator>
  )
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [readyToRender, setReadyToRender] = useState(false)
  const [token, setToken] = useState(null)

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-BlackItalic': require('./assets/fonts/Poppins-BlackItalic.ttf'),
    })
    setFontsLoaded(true)
  }

  //get push notifications for payment notifications later on at app entry
  useEffect(() => {
    const configurePushNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync()
      let finalStatus = status

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permission required', 'Push notifications need the appropriate permissions.')
        return
      }

      const pushToken = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })

      console.log("PUSH TOKEN: ", pushToken)
      setToken(pushToken.data)

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        })
      }
    }

    configurePushNotifications()
  }, [])

  useEffect(() => {
    loadFonts()
  }, [])

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setReadyToRender(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [fontsLoaded])

  return (
    <SafeAreaProvider>
      {readyToRender ? (
        <>
          <NavigationContainer ref={navigationRef}>
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
          <Toast config={toastConfig} />
        </>
      ) : (
        <CustomSplashScreen />
      )}
    </SafeAreaProvider>
  )
}
