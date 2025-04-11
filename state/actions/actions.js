// actions.js
import {
  FETCH_FEATURED_RESTAURANTS,
  FETCH_FEATURED_RESTAURANTS_SUCCESS,
  FETCH_FEATURED_RESTAURANTS_FAILURE,
  SET_USER,
  SET_CURRENT_CITY,
  SET_LOCAL_RESTAURANTS,
  SET_LOCAL_RESTAURANTS_SUCCESS,
  SET_LOCAL_RESTAURANTS_FAILURE,
} from './actionTypes'

export const fetchFeaturedRestaurants = () => ({
  type: FETCH_FEATURED_RESTAURANTS,
})

export const fetchFeaturedRestaurantsSuccess = (data) => ({
  type: FETCH_FEATURED_RESTAURANTS_SUCCESS,
  payload: data,
})

export const fetchFeaturedRestaurantsFailure = (error) => ({
  type: FETCH_FEATURED_RESTAURANTS_FAILURE,
  error,
})

export const setCurrentCity = (data) => ({
  type: SET_CURRENT_CITY,
  payload: data,
})

export const setLocalRestaurants = (coords) => ({
  type: SET_LOCAL_RESTAURANTS,
  payload: coords
})

export const setLocalRestaurantsSuccess = (data) => ({
  type: SET_LOCAL_RESTAURANTS_SUCCESS,
  payload: data,
})

export const setLocalRestaurantsFailure = (error) => ({
  type: SET_LOCAL_RESTAURANTS_FAILURE,
  error,
})

export const setUser = (data) => ({
  type: SET_USER,
  payload: data,
})
