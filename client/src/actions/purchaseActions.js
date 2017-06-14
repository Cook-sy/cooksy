import axios from 'axios';

import { attachTokenToTheHeader } from '../utils/RequestHelper';

export const GET_PURCHASES = 'GET_PURCHASES';

export function getPurchases() {
  const headers = attachTokenToTheHeader();
  const request = axios.get('/api/users/purchases', { headers });

  return {
    type: GET_PURCHASES,
    payload: request
  };
}
