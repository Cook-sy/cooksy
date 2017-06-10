import axios from 'axios';
import _ from 'lodash';

import { attachTokenToTheHeader } from '../utils/RequestHelper';

export const CREATE_MEAL = 'CREATE_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_MEALDETAIL = 'FETCH_MEALDETAIL';
export const FETCH_MEALS_BY_CHEF = 'FETCH_MEALS_BY_CHEF';
export const GET_NEAR_BY_MEALS = 'GET_NEAR_BY_MEALS';
export const FETCH_MEALS_BY_DATE = 'FETCH_MEALS_BY_DATE';
export const FETCH_UPCOMING_MEALS = 'FETCH_UPCOMING_MEALS';

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

export function fetchUpcomingMeals() {
  let mealStorage = {};
  let time = [];
  let request = axios.get('/api/meals')
    .then(function(meals) {
      _.map(meals.data, (meal) => {
        let date = new Date(meal.deliveryDateTime);
        time.push([date.getTime(), meal.deliveryDateTime.substr(0, 10)]);
      });
      time.sort(function(a, b) {
        return a[0] - b[0];
      });
      _.map(time, (tuple) => {
        if (Object.keys(mealStorage).length === 3) {
          return;
        };
        if (!mealStorage[tuple[1]]) {
          mealStorage[tuple[1]] = [];
        };
      });
      _.map(meals.data, (meal) => {
        for (var key in mealStorage) {
          if (key === meal.deliveryDateTime.substr(0, 10)) {
            mealStorage[key].push(meal);
          };
        };
      });
      return mealStorage;
    });

  return {
    type: FETCH_UPCOMING_MEALS,
    payload: request
  };
};

