import axios from 'axios';

import { decodeToken as userDetails, deleteToken } from '../utils/IsAuthenticated';

export const AUTHENTICATE = 'AUTHENTICATE';
export const USER_DETAILS = 'USER_DETAILS';
export const LOG_OUT = 'LOG_OUT';
export const SELECT_USER_ROLE = 'SELECT_USER_ROLE';

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
    };
  } else {
    return {
      type:'USER_NOT_REGISTERED'
    };
  }
} 

export function logout() {
  deleteToken('cooksy');
  return {
    type: LOG_OUT
  };
}

export function selectUserRole(role) {
  return {
    type: SELECT_USER_ROLE,
    payload: role
  };
}