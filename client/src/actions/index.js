<<<<<<< HEAD
export * from './authActions';
export * from './mealsActions';
export * from './reviewActions';
=======
import axios from 'axios';
import { change } from 'redux-form';
import _ from 'lodash';

import { attachTokenToTheHeader } from '../utils/RequestHelper';
import { decodeToken as username } from '../utils/IsAuthenticated';

export const CREATE_MEAL = 'CREATE_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_MEALDETAIL = 'FETCH_MEALDETAIL';
export const AUTHENTICATE = 'AUTHENTICATE';
export const REVIEW_MEAL = 'REVIEW_MEAL';
export const RATE_MEAL = 'RATE_MEAL';
export const TOGGLE_REVIEW = 'TOGGLE_REVIEW';
export const DID_REVIEW = 'DID_REVIEW';
export const DID_NOT_REVIEW = 'DID_NOT_REVIEW';
export const FETCH_TODAYS_MEALS = 'FETCH_TODAYS_MEALS';

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
  const request = axios.post('/api/users/meals/reviews', values, {
    headers: headers
  });

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

export function fetchTodaysMeals() {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString().length === 1 ? '0' + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString();
  let day = (today.getDate() + 1).toString().length === 1 ? '0' + (today.getDate() + 1).toString() : (today.getDate() + 1).toString();
  const date = year + '-' + month + '-' + day;
  let request = axios.get('/api/meals')
    .then(function(meals) {
      console.log(meals);
      return _.filter(meals.data, (meal) => {
        return meal.deliveryDateTime.substr(0, 10) === '2017-08-18';
      });
    });

  return {
    type: FETCH_TODAYS_MEALS,
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
  // eslint-disable-next-line
  rate => change('ReviewsForm', 'rating', rate);

  return {
    type: RATE_MEAL
  };
}

export function toggleReview() {
  return {
    type: TOGGLE_REVIEW
  };
}

export function successfullReview(meal) {
  return {
    type: DID_REVIEW
  };
}

export function didReview(meal) {
  const user = username() && username().user;
  const mealReviewwedByTheUser = meal.mealReviews.find(
    review => review.user.username === user
  );
  if (mealReviewwedByTheUser) {
    return {
      type: DID_REVIEW
    };
  } else {
    return {
      type: DID_NOT_REVIEW
    };
  }
}
>>>>>>> (feat) Write a function to filter meals by current day
