import { FETCH_FEATURED_RESTAURANTS, FETCH_FEATURED_RESTAURANTS_FAILURE, FETCH_FEATURED_RESTAURANTS_SUCCESS } from '../actions/actions'

const initialState = {
  user: {},
  featuredRestaurants: [],
  loading: false,
  error: null,
}

const AppReducer = (state = initialState, action) => {
  console.log('THIS IS THE ACTION', action)
  console.log('CURRENT STATE', state)

  switch (action.type) {
    case FETCH_FEATURED_RESTAURANTS:
      return { ...state, loading: true, error: null }
    case FETCH_FEATURED_RESTAURANTS_SUCCESS:
      console.log('Received Action:', action);  // Logs the entire action
      console.log('REDUCER RECEIVED DATA:', action.payload);
      return { ...state, featuredRestaurants: action.payload, loading: false, error: null }
    case FETCH_FEATURED_RESTAURANTS_FAILURE:
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}

export default AppReducer
