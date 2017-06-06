import axios from 'axios';

import { attachTokenToTheHeader } from '../utils/RequestHelper';

export const CREATE_MEAL = 'CREATE_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_MEALDETAIL = 'FETCH_MEALDETAIL';

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

export function fetchMealDetail(id) {
  const request = axios.get(`/api/meals/${id}`);

  return {
    type: FETCH_MEALDETAIL,
    payload: request
  };
}