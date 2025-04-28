//this is where we handle data fetching
import { put, takeLatest, all, call, debounce } from 'redux-saga/effects'
import { API_URL } from '../../constants/constants'
import Constants from 'expo-constants'
import { FETCH_FEATURED_RESTAURANTS, SET_LOCAL_RESTAURANTS, AUTO_COMPLETE_DINER, POST_DINING_EVENT } from '../actions/actionTypes'
import {
  autoCompleteDinerFailure,
  autoCompleteDinerSuccess,
  fetchFeaturedRestaurantsFailure,
  fetchFeaturedRestaurantsSuccess,
  setLocalRestaurantsFailure,
  setLocalRestaurantsSuccess,
  postDiningEventFailure,
  postDiningEventSuccess,
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

function* fetchFeaturedRestaurants() {
  try {
    const response = yield call(fetch, `${API_URL}/featuredRestaurants`, { method: 'GET' })
    const data = yield response.json()
    yield put(fetchFeaturedRestaurantsSuccess(data))
  } catch (error) {
    yield put(fetchFeaturedRestaurantsFailure(error.message))
  }
}
function* watchFetchFeaturedRestaurants() {
  yield takeLatest(FETCH_FEATURED_RESTAURANTS, fetchFeaturedRestaurants)
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

export default function* rootSaga() {
  yield all([watchFetchFeaturedRestaurants(), watchSetLocalRestaurants(), watchAutoCompleteDiner(), watchPostDiningEvent()])
}
