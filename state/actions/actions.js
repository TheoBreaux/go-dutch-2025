// actions.js
import {
  FETCH_FEATURED_RESTAURANTS,
  FETCH_FEATURED_RESTAURANTS_FAILURE,
  FETCH_FEATURED_RESTAURANTS_SUCCESS,
  SET_CURRENT_CITY_SUCCESS,
  SET_RECEIPT_DATA_FAILURE,
  SET_RECEIPT_DATA_SUCCESS,
  SET_LOCAL_RESTAURANTS,
  SET_LOCAL_RESTAURANTS_FAILURE,
  SET_LOCAL_RESTAURANTS_SUCCESS,
  SET_USER_SUCCESS,
} from './actionTypes'

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

export const setUser = (data) => ({
  type: SET_USER_SUCCESS,
  payload: data,
})
