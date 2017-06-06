import axios from 'axios';

export const AUTHENTICATE = 'AUTHENTICATE';

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