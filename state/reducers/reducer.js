import {
  AUTO_COMPLETE_DINER,
  AUTO_COMPLETE_DINER_FAILURE,
  AUTO_COMPLETE_DINER_SUCCESS,
  FETCH_DINING_HISTORY,
  FETCH_DINING_HISTORY_FAILURE,
  FETCH_DINING_HISTORY_SUCCESS,
  FETCH_FEATURED_RESTAURANTS,
  FETCH_FEATURED_RESTAURANTS_FAILURE,
  FETCH_FEATURED_RESTAURANTS_SUCCESS,
  POST_DINING_EVENT,
  POST_DINING_EVENT_FAILURE,
  POST_DINING_EVENT_SUCCESS,
  SET_USER_SUCCESS,
  SET_CURRENT_CITY_SUCCESS,
  SET_LOCAL_RESTAURANTS,
  SET_LOCAL_RESTAURANTS_SUCCESS,
  SET_LOCAL_RESTAURANTS_FAILURE,
  SET_RECEIPT_DATA_FAILURE,
  SET_RECEIPT_DATA_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  currentCity: null,
  diningHistory: [],
  error: null,
  featuredRestaurants: [],
  favorites: [],
  loading: false,
  localRestaurants: [],
  receiptData: null,
  suggestions: [],
  user: {},
}

const AppReducer = (state = initialState, action) => {
  // console.log('ACTION IN REDUCER', action)
  // console.log('CURRENT STATE', state)

  switch (action.type) {
    case AUTO_COMPLETE_DINER:
      return { ...state, loading: true, error: null }
    case AUTO_COMPLETE_DINER_SUCCESS:
      return { ...state, suggestions: action.payload, loading: false, error: null }
    case AUTO_COMPLETE_DINER_FAILURE:
      return { ...state, error: action.error, loading: false }
    case FETCH_DINING_HISTORY:
      return { ...state, loading: true, error: null }
    case FETCH_DINING_HISTORY_SUCCESS:
      return { ...state, diningHistory: action.payload, loading: false, error: null }
    case FETCH_DINING_HISTORY_FAILURE:
      return { ...state, error: action.error, loading: false }
    case FETCH_FEATURED_RESTAURANTS:
      return { ...state, loading: true, error: null }
    case FETCH_FEATURED_RESTAURANTS_SUCCESS:
      return { ...state, featuredRestaurants: action.payload, loading: false, error: null }
    case FETCH_FEATURED_RESTAURANTS_FAILURE:
      return { ...state, error: action.error, loading: false }
    // case LOGOUT_USER:
    //   return { ...state, user: {}, currentCity: null, featuredRestaurants: [], localRestaurants: [] }
    case POST_DINING_EVENT:
      return { ...state, loading: true, error: null }
    case POST_DINING_EVENT_FAILURE:
      return { ...state, error: action.error, loading: false }
    case POST_DINING_EVENT_SUCCESS:
      return { ...state, diningHistory: [action.payload, ...state.diningHistory], loading: false, error: null }
    case SET_CURRENT_CITY_SUCCESS:
      return { ...state, currentCity: action.payload, loading: false }
    case SET_LOCAL_RESTAURANTS:
      return { ...state, loading: true, error: null }
    case SET_LOCAL_RESTAURANTS_FAILURE:
      return { ...state, error: action.error, loading: false }
    case SET_LOCAL_RESTAURANTS_SUCCESS:
      return { ...state, localRestaurants: action.payload, loading: false, error: null }
    case SET_RECEIPT_DATA_FAILURE:
      return { ...state, error: action.error, loading: false }
    case SET_RECEIPT_DATA_SUCCESS:
      return { ...state, receiptData: action.payload, loading: false, error: null }

    case SET_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false }
    default:
      return state
  }
}

export default AppReducer
