import { FETCH_FEATURED_RESTAURANTS, FETCH_FEATURED_RESTAURANTS_FAILURE, FETCH_FEATURED_RESTAURANTS_SUCCESS, SET_USER } from '../actions/actionTypes'

const initialState = {
  user: {},
  featuredRestaurants: [],
  loading: false,
  error: null,
}

const AppReducer = (state = initialState, action) => {
  console.log('ACTION', action)
  console.log('CURRENT STATE', state)

  let updatedUser

  switch (action.type) {
    case FETCH_FEATURED_RESTAURANTS:
      return { ...state, loading: true, error: null }
    case FETCH_FEATURED_RESTAURANTS_SUCCESS:
      return { ...state, featuredRestaurants: action.payload, loading: false, error: null }
    case FETCH_FEATURED_RESTAURANTS_FAILURE:
      return { ...state, error: action.error, loading: false }
    case SET_USER:
      return { ...state, user: action.payload, loading: false }
    default:
      return state
  }
}

export default AppReducer
