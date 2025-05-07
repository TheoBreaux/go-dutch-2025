// actions.js
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
  SET_RECEIPT_DATA_FAILURE,
  SET_RECEIPT_DATA_SUCCESS,
  SET_LOCAL_RESTAURANTS,
  SET_LOCAL_RESTAURANTS_FAILURE,
  SET_LOCAL_RESTAURANTS_SUCCESS,
  SIGN_UP_USER,
  SIGN_UP_USER_FAILURE,
  SIGN_UP_USER_SUCCESS,
  TOGGLE_FAVORITE,
  TOGGLE_FAVORITE_FAILURE,
  TOGGLE_FAVORITE_SUCCESS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_SUCCESS,
} from './actionTypes'

export const autoCompleteDiner = (query) => ({
  type: AUTO_COMPLETE_DINER,
  payload: query,
})

export const autoCompleteDinerFailure = (error) => ({
  type: AUTO_COMPLETE_DINER_FAILURE,
  error,
})

export const autoCompleteDinerSuccess = (data) => ({
  type: AUTO_COMPLETE_DINER_SUCCESS,
  payload: data,
})

export const fetchDiningHistory = (data) => ({
  type: FETCH_DINING_HISTORY,
  payload: data,
})

export const fetchDiningHistoryFailure = (error) => ({
  type: FETCH_DINING_HISTORY_FAILURE,
  error,
})

export const fetchDiningHistorySuccess = (data) => ({
  type: FETCH_DINING_HISTORY_SUCCESS,
  payload: data,
})

export const fetchFavorites = (data) => ({
  type: FETCH_FAVORITES,
  payload: data,
})

export const fetchFavoritesFailure = (error) => ({
  type: FETCH_FAVORITES_FAILURE,
  error,
})

export const fetchFavoritesSuccess = (data) => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: data,
})

export const fetchFeaturedRestaurants = () => ({
  type: FETCH_FEATURED_RESTAURANTS,
})

export const fetchFeaturedRestaurantsFailure = (error) => ({
  type: FETCH_FEATURED_RESTAURANTS_FAILURE,
  error,
})

export const fetchFeaturedRestaurantsSuccess = (data) => ({
  type: FETCH_FEATURED_RESTAURANTS_SUCCESS,
  payload: data,
})

export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload: data,
})

export const logoutUser = () => ({
  type: LOGOUT_USER,
})

export const postDiningEvent = (data) => ({
  type: POST_DINING_EVENT,
  payload: data,
})

export const postDiningEventFailure = (error) => ({
  type: POST_DINING_EVENT_FAILURE,
  error,
})

export const postDiningEventSuccess = (data) => ({
  type: POST_DINING_EVENT_SUCCESS,
  payload: data,
})

export const setCurrentCity = (data) => ({
  type: SET_CURRENT_CITY_SUCCESS,
  payload: data,
})

export const setLocalRestaurants = (coords) => ({
  type: SET_LOCAL_RESTAURANTS,
  payload: coords,
})

export const setLocalRestaurantsFailure = (error) => ({
  type: SET_LOCAL_RESTAURANTS_FAILURE,
  error,
})

export const setLocalRestaurantsSuccess = (data) => ({
  type: SET_LOCAL_RESTAURANTS_SUCCESS,
  payload: data,
})

export const setReceiptDataSuccess = (data) => ({
  type: SET_RECEIPT_DATA_SUCCESS,
  payload: data,
})

export const setReceiptDataFailure = (error) => ({
  type: SET_RECEIPT_DATA_FAILURE,
  error,
})

export const signUpUser = (data) => ({
  type: SIGN_UP_USER,
  payload: data,
})

export const signUpUserFailure = (error) => ({
  type: SIGN_UP_USER_FAILURE,
  error,
})

export const signUpUserSuccess = (data) => ({
  type: SIGN_UP_USER_SUCCESS,
  payload: data,
})

export const toggleFavorite = (item) => ({
  type: TOGGLE_FAVORITE,
  payload: item,
})

export const toggleFavoriteSuccess = (updatedFavorites) => ({
  type: TOGGLE_FAVORITE_SUCCESS,
  payload: updatedFavorites,
})

export const toggleFavoriteFailure = (error) => ({
  type: TOGGLE_FAVORITE_FAILURE,
  error,
})

export const updateUserProfile = (data) => ({
  type: UPDATE_USER_PROFILE,
  payload: data,
})

export const updateUserProfileFailure = (error) => ({
  type: UPDATE_USER_PROFILE_FAILURE,
  error,
})

export const updateUserProfileSuccess = (data) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: data,
})
