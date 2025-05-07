//this is where we handle data fetching
import { put, takeLatest, all, call, debounce, select } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import * as RootNavigation from '../../utils/RootNavigation'
import { API_URL } from '../../constants/constants'
import Constants from 'expo-constants'
import {
  FETCH_FAVORITES,
  FETCH_FEATURED_RESTAURANTS,
  SET_LOCAL_RESTAURANTS,
  SIGN_UP_USER,
  AUTO_COMPLETE_DINER,
  POST_DINING_EVENT,
  FETCH_DINING_HISTORY,
  UPDATE_USER_PROFILE,
  TOGGLE_FAVORITE,
} from '../actions/actionTypes'
import {
  autoCompleteDinerFailure,
  autoCompleteDinerSuccess,
  loginUser,
  fetchDiningHistoryFailure,
  fetchDiningHistorySuccess,
  fetchFavoritesFailure,
  fetchFavoritesSuccess,
  fetchFeaturedRestaurantsFailure,
  fetchFeaturedRestaurantsSuccess,
  postDiningEventFailure,
  postDiningEventSuccess,
  setLocalRestaurantsFailure,
  setLocalRestaurantsSuccess,
  signUpUserFailure,
  signUpUserSuccess,
  toggleFavoriteFailure,
  toggleFavoriteSuccess,
  updateUserProfileFailure,
  updateUserProfileSuccess,
} from '../actions/actions'

const API_KEY = Constants.expoConfig.extra.API_KEY

function* autoCompleteDiner(action) {
  const inputValue = action.payload

  try {
    const response = yield call(fetch, `${API_URL}/diners/suggestions?input=${inputValue}`, { method: 'GET' })
    const data = yield response.json()
    yield put(autoCompleteDinerSuccess(data))
  } catch (error) {
    yield put(autoCompleteDinerFailure(error.message))
  }
}
function* watchAutoCompleteDiner() {
  yield debounce(300, AUTO_COMPLETE_DINER, autoCompleteDiner)
}

function* fetchFavorites(action) {
  const userId = action.payload

  try {
    const response = yield call(fetch, `${API_URL}/favorites/${userId}`, { method: 'GET' })
    const data = yield response.json()

    yield put(fetchFavoritesSuccess(data))
  } catch (error) {
    yield put(fetchFavoritesFailure(error.message))
  }
}
function* watchFetchFavorites() {
  yield takeLatest(FETCH_FAVORITES, fetchFavorites)
}

function* fetchFeaturedRestaurants() {
  try {
    const response = yield call(fetch, `${API_URL}/featuredRestaurants`, { method: 'GET' })
    const data = yield response.json()
    const filteredRestaurants = data.filter((item) => item.isFeatured)

    yield put(fetchFeaturedRestaurantsSuccess(filteredRestaurants))
  } catch (error) {
    yield put(fetchFeaturedRestaurantsFailure(error.message))
  }
}
function* watchFetchFeaturedRestaurants() {
  yield takeLatest(FETCH_FEATURED_RESTAURANTS, fetchFeaturedRestaurants)
}

function* fetchDiningHistory(action) {
  const userId = action.payload

  try {
    const response = yield call(fetch, `${API_URL}/diningevents/${userId}`, { method: 'GET' })
    const data = yield response.json()
    yield put(fetchDiningHistorySuccess(data))
  } catch (error) {
    yield put(fetchDiningHistoryFailure(error.message))
  }
}
function* watchFetchDiningHistory() {
  yield takeLatest(FETCH_DINING_HISTORY, fetchDiningHistory)
}

function* postDiningEvent(action) {
  try {
    const response = yield call(fetch, `${API_URL}/diningevents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    })

    if (!response.ok) {
      const errorData = yield response.json()
      throw new Error(errorData.message || 'Failed to post dining event')
    }

    const data = yield response.json()
    yield put(postDiningEventSuccess(data))
  } catch (error) {
    console.error('POST DINING EVENT ERROR:', error)
    yield put(postDiningEventFailure(error.message))
  }
}
function* watchPostDiningEvent() {
  yield takeLatest(POST_DINING_EVENT, postDiningEvent)
}

function* signUpUser(action) {
  try {
    const response = yield call(fetch, `${API_URL}/signUp`, {
      method: 'POST',
      body: action.payload,
    })

    if (!response.ok) {
      const errorData = yield response.json()
      throw new Error(errorData?.message || 'Something went wrong. Please try again.')
    }

    const data = yield response.json()

    // Dispatch success action with updated data
    yield put(signUpUserSuccess(data))
    // Dispatch login action
    yield put(loginUser(data))

    yield call(Toast.show, {
      type: 'success',
      text1: 'Success 🎉',
      text2: data?.message || 'Registration successful!',
      position: 'top',
      visibilityTime: 2000,
    })

    // Navigate after toast is shown
    yield call(RootNavigation.navigate, 'Tabs', { screen: 'Home' })
  } catch (error) {
    yield call(Toast.show, {
      type: 'error',
      text1: 'Error 😞',
      text2: error.message,
      position: 'top',
      visibilityTime: 2000,
    })

    yield put(signUpUserFailure(error.message))
  }
}
function* watchSignUpUser() {
  yield takeLatest(SIGN_UP_USER, signUpUser)
}

function* setLocalRestaurants(action) {
  const { latitude, longitude } = action.payload

  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  const location = `location=${latitude},${longitude}`
  const radius = '&radius=2000'
  const type = '&keyword=restaurant'
  const key = `&key=${API_KEY}`
  const restaurantSearchUrl = url + location + radius + type + key

  try {
    const response = yield call(fetch, restaurantSearchUrl)
    const data = yield response.json()
    yield put(setLocalRestaurantsSuccess(data.results))
  } catch (error) {
    yield put(setLocalRestaurantsFailure(error.message))
  }
}
function* watchSetLocalRestaurants() {
  yield takeLatest(SET_LOCAL_RESTAURANTS, setLocalRestaurants)
}

function* toggleFavorite(action) {
  const item = action.payload
  const userId = yield select((state) => state.app.user.userId)

  try {
    const type = item.restaurantId ? 'restaurant' : 'diner'
    const favoritedId = item.restaurantId || item.userId

    const response = yield call(fetch, `${API_URL}/updatefavorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favoritedId,
        userId,
        type,
      }),
    })

    if (!response.ok) {
      const errorData = yield response.json()
      throw new Error(errorData.message || 'Failed to update favorite')
    }

    const { item: updatedItem } = yield response.json()
    yield put(
      toggleFavoriteSuccess({
        ...item,
        isFavorite: updatedItem.isFavorite,
      })
    )
  } catch (error) {
    console.error('TOGGLE FAVORITE ERROR:', error)
    yield put(toggleFavoriteFailure(error.message))
  }
}
function* watchToggleFavorite() {
  yield takeLatest(TOGGLE_FAVORITE, toggleFavorite)
}

function* updateUserProfile(action) {
  try {
    const response = yield call(fetch, `${API_URL}/updateprofile`, {
      method: 'POST',
      body: action.payload,
    })

    if (!response.ok) {
      const errorData = yield response.json()
      throw new Error(errorData.message || 'Profile update failed')
    }

    const data = yield response.json()

    // Dispatch success action with updated data
    yield put(updateUserProfileSuccess(data.user))

    // Show success toast
    yield call(Toast.show, {
      type: 'success',
      text1: 'Success!',
      text2: 'Profile updated successfully',
      position: 'top',
      visibilityTime: 2000,
    })

    // Navigate after toast is shown
    yield call(RootNavigation.navigate, 'Tabs', { screen: 'Home' })
  } catch (error) {
    // Show error toast
    yield call(Toast.show, {
      type: 'error',
      text1: 'Update Failed',
      text2: error.message,
      position: 'top',
    })
    yield put(updateUserProfileFailure(error.message))
  }
}
function* watchUpdateUserProfile() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile)
}

export default function* rootSaga() {
  yield all([
    watchFetchFavorites(),
    watchFetchFeaturedRestaurants(),
    watchSetLocalRestaurants(),
    watchAutoCompleteDiner(),
    watchPostDiningEvent(),
    watchFetchDiningHistory(),
    watchUpdateUserProfile(),
    watchSignUpUser(),
    watchToggleFavorite(),
  ])
}
