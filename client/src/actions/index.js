import axios from 'axios';

export const CREATE_MEAL = 'CREATE_MEAL';

export function createMeal(values, cb) {
  const request = axios.post('/api/chefs/meals', values).then(cb);

  return {
    type: CREATE_MEAL,
    payload: Request
  };
}
