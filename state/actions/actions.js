// actions.js
import {
  AUTO_COMPLETE_DINER,
  AUTO_COMPLETE_DINER_FAILURE,
  AUTO_COMPLETE_DINER_SUCCESS,
  FETCH_FEATURED_RESTAURANTS,
  FETCH_FEATURED_RESTAURANTS_FAILURE,
  FETCH_FEATURED_RESTAURANTS_SUCCESS,
  POST_DINING_EVENT,
  POST_DINING_EVENT_FAILURE,
  POST_DINING_EVENT_SUCCESS,
  SET_CURRENT_CITY_SUCCESS,
  SET_RECEIPT_DATA_FAILURE,
  SET_RECEIPT_DATA_SUCCESS,
  SET_LOCAL_RESTAURANTS,
  SET_LOCAL_RESTAURANTS_FAILURE,
  SET_LOCAL_RESTAURANTS_SUCCESS,
  SET_USER_SUCCESS,
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

export const setUser = (data) => ({
  type: SET_USER_SUCCESS,
  payload: data,
})
