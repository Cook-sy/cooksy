import axios from 'axios';

import { attachTokenToTheHeader } from '../utils/RequestHelper';
import { decodeToken as userDetails } from '../utils/IsAuthenticated';

export const GET_PURCHASES = 'GET_PURCHASES';
export const POST_PURCHASE = 'POST_PURCHASE';

export function getPurchases() {
  const headers = attachTokenToTheHeader();
  const request = axios.get('/api/users/purchases', { headers });

  return {
    type: GET_PURCHASES,
    payload: request
  };
}

export function postPurchaseDetails(values) {
  const request = axios.post('/api/users/purchases', values, { headers: headers });

  return {
    type: POST_PURCHASE,
    payload: request
  };
}
