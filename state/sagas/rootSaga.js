//this is where we handle data fetching
import { put, takeLatest, all, call } from 'redux-saga/effects'
import { API_URL } from '../../constants/constants'
import Constants from 'expo-constants'
import { FETCH_FEATURED_RESTAURANTS, SET_LOCAL_RESTAURANTS } from '../actions/actionTypes'
import {
  fetchFeaturedRestaurantsFailure,
  fetchFeaturedRestaurantsSuccess,
  setLocalRestaurantsFailure,
  setLocalRestaurantsSuccess,
} from '../actions/actions'

const API_KEY = Constants.expoConfig.extra.API_KEY

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



function* setLocalRestaurants(action) {
  console.log('ACTION IN SAGA: ', action)

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
    console.log('Dispatching action with restaurants:', data.results);
    yield put(setLocalRestaurantsSuccess(data.results))
  } catch (error) {
    yield put(setLocalRestaurantsFailure(error.message))
  }
}
function* watchSetLocalRestaurants() {
  yield takeLatest(SET_LOCAL_RESTAURANTS, setLocalRestaurants)
}

export default function* rootSaga() {
  yield all([watchFetchFeaturedRestaurants(), watchSetLocalRestaurants()])
}








// const handleRestaurantSearch = async () => {
//   if (hasLocationPermission) {
//     const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
//     const location = `location=${latitude},${longitude}`
//     const radius = '&radius=2000'
//     const type = '&keyword=restaurant'
//     const key = `&key=${API_KEY}`
//     const restaurantSearchUrl = url + location + radius + type + key

//     try {
//       const response = await fetch(restaurantSearchUrl)
//       if (!response.ok) {
//         throw new Error('Network response was not ok')
//       }
//       const result = await response.json()
//       const data = result.results
//       dispatch(setLocalRestaurants(data))
//       console.log('LOCATE RESTAURANTS DATA: ', data)
//       return data
//     } catch (error) {
//       console.error('Error fetching restaurant data:', error)
//     }
//   }
//
