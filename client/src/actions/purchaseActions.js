import axios from 'axios';

import { attachTokenToTheHeader } from '../utils/RequestHelper';
import { decodeToken as userDetails } from '../utils/IsAuthenticated';

export const GET_PURCHASES = 'GET_PURCHASES';

export function getPurchases() {
  const user = userDetails();
  const userId = user && user.sub;
  const headers = attachTokenToTheHeader();
  const request = axios.get('/api/users/purchases', { headers });

  return {
    type: GET_PURCHASES,
    payload: request
  };
}