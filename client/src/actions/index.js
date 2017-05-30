import axios from 'axios';

export const CREATE_MEAL = 'CREATE_MEAL';

const ROOT_URL = 'http://localhost:3001';
export function createMeal(values, cb) {
  const request = axios.post(`${ROOT_URL}/api/chefs/meals`, values)
    .then(cb)

  return {
    type: CREATE_MEAL,
    payload: Request
  }
  
}