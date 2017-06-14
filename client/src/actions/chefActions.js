import axios from 'axios';
import { attachTokenToTheHeader } from '../utils/RequestHelper';

export const FETCH_CHEF = 'FETCH_CHEF';

export function fetchChefDetails (id) {
  const request = axios.get(`/api/chefs/${id}`);

  return {
    type: FETCH_CHEF,
    payload: request
  };
}