import axios from 'axios';
import { change } from 'redux-form';

import { attachTokenToTheHeader } from '../utils/RequestHelper';
import { decodeToken as userDetails } from '../utils/IsAuthenticated';

export const GET_PURCHASES = 'GET_PURCHASES';

export function getPurchases() {
  const headers = attachTokenToTheHeader();
  const request = axios.get('api/users/purchases', { headers: headers });

  return {
    type: GET_PURCHASES,
    payload: request
  };
}