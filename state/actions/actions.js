// actions.js
import {
    FETCH_FEATURED_RESTAURANTS,
    FETCH_FEATURED_RESTAURANTS_SUCCESS,
    FETCH_FEATURED_RESTAURANTS_FAILURE,
  } from './actionTypes';
  
  export const fetchFeaturedRestaurants = () => ({
    type: FETCH_FEATURED_RESTAURANTS,
  });
  
  export const fetchFeaturedRestaurantsSuccess = (data) => ({
    type: FETCH_FEATURED_RESTAURANTS_SUCCESS,
    payload: data,
  });
  
  export const fetchFeaturedRestaurantsFailure = (error) => ({
    type: FETCH_FEATURED_RESTAURANTS_FAILURE,
    error,
  });
  
