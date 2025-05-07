import {
  AUTO_COMPLETE_DINER,
  AUTO_COMPLETE_DINER_FAILURE,
  AUTO_COMPLETE_DINER_SUCCESS,
  FETCH_DINING_HISTORY,
  FETCH_DINING_HISTORY_FAILURE,
  FETCH_DINING_HISTORY_SUCCESS,
  FETCH_FAVORITES,
  FETCH_FAVORITES_FAILURE,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FEATURED_RESTAURANTS,
  FETCH_FEATURED_RESTAURANTS_FAILURE,
  FETCH_FEATURED_RESTAURANTS_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
  POST_DINING_EVENT,
  POST_DINING_EVENT_FAILURE,
  POST_DINING_EVENT_SUCCESS,
  SET_CURRENT_CITY_SUCCESS,
  SET_LOCAL_RESTAURANTS,
  SET_LOCAL_RESTAURANTS_SUCCESS,
  SET_LOCAL_RESTAURANTS_FAILURE,
  SET_RECEIPT_DATA_FAILURE,
  SET_RECEIPT_DATA_SUCCESS,
  SIGN_UP_USER,
  SIGN_UP_USER_FAILURE,
  SIGN_UP_USER_SUCCESS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_SUCCESS,
  TOGGLE_FAVORITE,
  TOGGLE_FAVORITE_FAILURE,
  TOGGLE_FAVORITE_SUCCESS,
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
    // Autocomplete
    case AUTO_COMPLETE_DINER:
      return { ...state, loading: true, error: null }
    case AUTO_COMPLETE_DINER_SUCCESS:
      return { ...state, suggestions: action.payload, loading: false, error: null }
    case AUTO_COMPLETE_DINER_FAILURE:
      return { ...state, error: action.error, loading: false }
    // Dining History
    case FETCH_DINING_HISTORY:
      return { ...state, loading: true, error: null }
    case FETCH_DINING_HISTORY_SUCCESS:
      return { ...state, diningHistory: action.payload, loading: false, error: null }
    case FETCH_DINING_HISTORY_FAILURE:
      return { ...state, error: action.error, loading: false }
    // Fetch Favorites
    case FETCH_FAVORITES:
      return { ...state, loading: true, error: null }
    case FETCH_FAVORITES_SUCCESS:
      return { ...state, favorites: action.payload, loading: false, error: null }
    case FETCH_FAVORITES_FAILURE:
      return { ...state, error: action.error, loading: false }
    // Fetch Restaurants
    case FETCH_FEATURED_RESTAURANTS:
      return { ...state, loading: true, error: null }
    case FETCH_FEATURED_RESTAURANTS_SUCCESS:
      return { ...state, featuredRestaurants: action.payload, loading: false, error: null }
    case FETCH_FEATURED_RESTAURANTS_FAILURE:
      return { ...state, error: action.error, loading: false }
    // Log In User
    case LOGIN_USER:
      return { ...state, user: action.payload, loading: false }
    // Log Out User
    case LOGOUT_USER:
      return {
        ...initialState,
      }
    // Post Dining Event
    case POST_DINING_EVENT:
      return { ...state, loading: true, error: null }
    case POST_DINING_EVENT_FAILURE:
      return { ...state, error: action.error, loading: false }
    case POST_DINING_EVENT_SUCCESS:
      return { ...state, diningHistory: [action.payload, ...state.diningHistory], loading: false, error: null }
    // Set Current Location
    case SET_CURRENT_CITY_SUCCESS:
      return { ...state, currentCity: action.payload, loading: false }
    // Fetch Google Local Restaurants
    case SET_LOCAL_RESTAURANTS:
      return { ...state, loading: true, error: null }
    case SET_LOCAL_RESTAURANTS_FAILURE:
      return { ...state, error: action.error, loading: false }
    case SET_LOCAL_RESTAURANTS_SUCCESS:
      return { ...state, localRestaurants: action.payload, loading: false, error: null }
    // Fetch Receipt Details
    case SET_RECEIPT_DATA_FAILURE:
      return { ...state, error: action.error, loading: false }
    case SET_RECEIPT_DATA_SUCCESS:
      return { ...state, receiptData: action.payload, loading: false, error: null }
    //Sign Up User
    case SIGN_UP_USER:
      return { ...state, loading: true, error: null }
    case SIGN_UP_USER_FAILURE:
      return { ...state, error: action.error, loading: false }
    case SIGN_UP_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null }
    //Toggle Favorite
    case TOGGLE_FAVORITE: {
      // const item = action.payload
      // console.log('TOGGLE FAVORITE HAPPENING: ', item)
      // const isDiner = item.isDiner
      // const isRestaurant = item.isRestaurant
      // const itemId = isRestaurant ? item.restaurantId : item.userId
      // const exists = state.favorites.some((fav) => {
      //   const favId = fav.isRestaurant ? fav.restaurantId : fav.userId
      //   return ((isDiner && fav.isDiner) || (isRestaurant && fav.isRestaurant)) && favId === itemId
      // })
      // return {
      //   ...state,
      //   favorites: exists
      //     ? state.favorites.filter((fav) => !((fav.isRestaurant && fav.restaurantId === itemId) || (fav.isDiner && fav.userId === itemId)))
      //     : [...state.favorites, item],
      // }
    }
    case TOGGLE_FAVORITE_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case TOGGLE_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: action.payload,
      }
    // Update User Profile
    case UPDATE_USER_PROFILE:
      return { ...state, loading: true, error: null }
    case UPDATE_USER_PROFILE_FAILURE:
      return { ...state, error: action.error, loading: false }
    case UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null }
    default:
      return state
  }
}

export default AppReducer
