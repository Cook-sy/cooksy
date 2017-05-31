import axios from 'axios';

export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_MEALDETAIL = 'FETCH_MEALDETAIL';

export function fetchMeals() {
  const request = axios.get('/api/meals');

  return {
    type: FETCH_MEALS,
    payload: request
  };
}

export function fetchMealDetail(id) {
  const request = axios.get('/api/meals/:id');

  return {
    type: FETCH_MEALDETAIL,
    payload: request
  };
}
