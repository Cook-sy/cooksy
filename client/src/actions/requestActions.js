import axios from 'axios';

import { attachTokenToTheHeader } from '../utils/RequestHelper';

export const CREATE_REQUEST = 'CREATE_REQUEST';

export function createRequest(values) {
  const headers = attachTokenToTheHeader();
  const request = axios.post('/api/chefs/requests', values, { headers: headers });

  return {
    type: CREATE_REQUEST,
    payload: request
  };
}