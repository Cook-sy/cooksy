import axios from 'axios';
import _ from 'lodash';

import { attachTokenToTheHeader } from '../utils/RequestHelper';

export const CREATE_MEAL = 'CREATE_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_MEALDETAIL = 'FETCH_MEALDETAIL';
export const FETCH_MEALS_BY_CHEF = 'FETCH_MEALS_BY_CHEF';
export const GET_NEAR_BY_MEALS = 'GET_NEAR_BY_MEALS';
export const FETCH_MEALS_BY_DATE = 'FETCH_MEALS_BY_DATE';

export function createMeal(values, cb) {
  const headers = attachTokenToTheHeader();
  const request = axios.post('/api/chefs/meals', values, { headers: headers });

  return {
    type: CREATE_MEAL,
    payload: request
  };
}

export function fetchMeals() {
  const request = axios.get('/api/meals');

  return {
    type: FETCH_MEALS,
    payload: request
  };
}

export function fetchMealsByChef() {
  const headers = attachTokenToTheHeader();

  const request = axios.get('/api/chefs/meals', { headers: headers });

  return {
    type: FETCH_MEALS_BY_CHEF,
    payload: request
  };
}

export function fetchMealDetail(id) {
  const request = axios.get(`/api/meals/${id}`);

  return {
    type: FETCH_MEALDETAIL,
    payload: request
  };
}

export function getNearbyMeals(zipcode) {
  const request = axios.get(`/api/meals/?zip=${zipcode}&radius=36`);

  return {
    type: GET_NEAR_BY_MEALS,
    payload: request
  }
}

export function fetchTodaysMeals() {
  let today = new Date();
  let year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString().length === 1 ? '0' + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString();
  let day = today.getDate().toString().length === 1 ? '0' + today.getDate().toString() : today.getDate().toString();
  let date = year + '-' + month + '-' + day;

  let request = axios.get('/api/meals')
    .then(function(meals) {
      return _.filter(meals.data, (meal) => {
        return meal.deliveryDateTime.substr(0, 10) === date;
      });
    });

  return {
    type: FETCH_TODAYS_MEALS,
    payload: request
  };
}

export function fetchMealsByDate(date) {
  let request = axios.get('/api/meals')
  .then(function (meals){
    return _.filter(meals.data, (meal) => {
      return meal.deliveryDateTime.substr(0, 10) === date;
    });
  });

  return {
    type: FETCH_MEALS_BY_DATE,
    payload: request
  };
}

export function fetchTomorrowsMeals() {
  let today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  let year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString().length === 1 ? '0' + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString();
  let day = today.getDate().toString().length === 1 ? '0' + today.getDate().toString() : today.getDate().toString();
  let date = year + '-' + month + '-' + day;

  let request = axios.get('/api/meals')
    .then(function(meals) {
      console.log(meals);
      return _.filter(meals.data, (meal) => {
        return meal.deliveryDateTime.substr(0, 10) === date;
      });
    });

  return {
    type: FETCH_TOMORROWS_MEALS,
    payload: request
  };
}
