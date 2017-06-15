import axios from 'axios';

import { attachTokenToTheHeader } from '../utils/RequestHelper';
import { decodeToken } from '../utils/IsAuthenticated';

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const ORDER_REQUESTED_MEAL = 'ORDER_REQUESTED_MEAL';
export const GET_CHEF_REQUESTS = 'GET_CHEF_REQUESTS';
export const GET_USER_REQUESTS = 'GET_USER_REQUESTS';
export const GET_REQUEST_BY_ID = 'GET_REQUEST_BY_ID';

export function createRequest(values) {
  const headers = attachTokenToTheHeader();
  const request = axios.post('/api/chefs/requests', values, { headers: headers });

  return {
    type: CREATE_REQUEST,
    payload: request
  };
}

export function orderRequestedMeal(values) {
  const headers = attachTokenToTheHeader();
  const request = axios.post('/api/users/requests', values, { headers: headers });

  return {
    type: ORDER_REQUESTED_MEAL,
    payload: request
  };
}

export function getChefsRequests(chefId) {
  const request = axios.get(`/api/chefs/${chefId}/requests`);

  return {
    type: GET_CHEF_REQUESTS,
    payload: request
  };
}

export function getUsersRequests(userId) {
  const id = userId || decodeToken().sub;
  const request = axios.get(`/api/users/${id}/requests`);

  return {
    type: GET_USER_REQUESTS,
    payload: request
  };
}

export function getRequestById(requestId) {
  const request = axios.get(`/api/chefs/requests/${requestId}`);

  return {
    type: GET_REQUEST_BY_ID,
    payload: request
  };
}