import axios from 'axios';

export const CREATE_MEAL = 'CREATE_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_MEALDETAIL = 'FETCH_MEALDETAIL';
export const SIGN_UP_CHEF = 'SIGN_UP_CHEF';
export const SIGN_UP_USER = 'SIGN_UP_USER';

export function createMeal(values, cb) {
  const token = localStorage.getItem('cooksy');
  const headers = {'x-access-token': `Bearer ${token}`};
  const request = axios.post('/api/chefs/meals', values, { headers: headers })
    .then((res) => {
      cb
    });

  return {
    type: CREATE_MEAL,
    payload: request
  };
}

export function fetchMeals() {
  const request = axios.get('/api/meals');

  return {
    type: FETCH_MEALS,
    payload: request
  };
}

export function fetchMealDetail(id) {
  const request = axios.get(`/api/meals/${id}`);

  return {
    type: FETCH_MEALDETAIL,
    payload: request
  };
}

export function signUpUser(values, cb) {
  const request = axios
    .post('/api/users/signup', values)
    .then(({ data: { token } }) => cb(token));

  return {
    type: SIGN_UP_USER,
    payload: request
  };
}

export function signUpChef(values, cb) {
  values.image = !values.image ? '' : values.image;
  const request = axios
    .post('/api/chefs/signup', values)
    .then(({ data: { token } }) => cb(token));

  return {
    type: SIGN_UP_CHEF,
    payload: request
  };
}
