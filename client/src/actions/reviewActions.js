import axios from 'axios';
import { change } from 'redux-form';

import { attachTokenToTheHeader } from '../utils/RequestHelper';
import { decodeToken as userDetails } from '../utils/IsAuthenticated';

export const REVIEW_MEAL = 'REVIEW_MEAL';
export const RATE_MEAL = 'RATE_MEAL';
export const TOGGLE_REVIEW = 'TOGGLE_REVIEW';
export const DID_REVIEW = 'DID_REVIEW';
export const DID_NOT_REVIEW = 'DID_NOT_REVIEW';
export const CAN_NOT_REVIEW = 'CAN_NOT_REVIEW';

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
  const user = userDetails();
  const username = user && user.user;
  const role = user && user.role;
  if (role === 'chef' || !username) {
    return {
      type: CAN_NOT_REVIEW
    };
  }

  const mealReviewwedByTheUser = meal.mealReviews.find(
    review => review.user.username === username
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