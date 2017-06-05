import axios from 'axios';
import { attachTokenToTheHeader } from '../utils/RequestHelper';
import { change } from 'redux-form';
export const CREATE_MEAL = 'CREATE_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_MEALDETAIL = 'FETCH_MEALDETAIL';
export const AUTHENTICATE = 'AUTHENTICATE';
export const REVIEW_MEAL = 'REVIEW_MEAL';
export const RATE_MEAL = 'RATE_MEAL';

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

export function reviewMeal(values) {
  const headers = attachTokenToTheHeader();
  const request = axios
    .post('/api/users/meals/reviews', values, { headers: headers });

  return {
    type: REVIEW_MEAL,
    payload: request
  };
}

export function signUpUser(values, cb) {
  const request = axios
    .post('/api/users/signup', values)
    .then(({ data: { token } }) => cb(token));

  return {
    type: AUTHENTICATE,
    payload: request
  };
}

export function signUpChef(values, cb) {
  values.image = !values.image ? '' : values.image;
  const request = axios
    .post('/api/chefs/signup', values)
    .then(({ data: { token } }) => cb(token));

  return {
    type: AUTHENTICATE,
    payload: request
  };
}

export function logInChef(values, cb) {
  const request = axios
    .post('/api/chefs/login', values)
    .then(({ data: { token } }) => cb(token));

  return {
    type: AUTHENTICATE,
    payload: request
  };
}

export function logInUser(values, cb) {
  const request = axios
    .post('/api/users/login', values)
    .then(({ data: { token } }) => cb(token));

  return {
    type: AUTHENTICATE,
    payload: request
  };
}

export function rateMeal() {
  const x= rate => change( "ReviewsForm", "rating", rate );

  return {
    type: RATE_MEAL
  }
}