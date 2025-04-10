//this is where we handle data fetching
import { put, takeLatest, all, call } from 'redux-saga/effects'
import { API_URL } from '../../constants/constants'
import { FETCH_FEATURED_RESTAURANTS } from '../actions/actionTypes'
import { fetchFeaturedRestaurantsFailure, fetchFeaturedRestaurantsSuccess } from '../actions/actions'

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

export default function* rootSaga() {
  yield all([watchFetchFeaturedRestaurants()])
}
