import axios from 'axios';

import { decodeToken as userDetails } from '../utils/IsAuthenticated';

export const AUTHENTICATE = 'AUTHENTICATE';
export const USER_DETAILS = 'USER_DETAILS';

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

export function getUserDetails() {
  const user = userDetails();
  if (user) {
    return {
      type: USER_DETAILS,
      payload: user
    }
  } else {
    return {
      type:'USER_NOT_REGISTERED'
    }
  }
} 