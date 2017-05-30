<<<<<<< HEAD
import axios from 'axios';

export const CREATE_MEAL = 'CREATE_MEAL';

export function createMeal(values, cb) {
  const request = axios.post('/api/chefs/meals', values).then(cb);

  return {
    type: CREATE_MEAL,
    payload: Request
=======
export function selectMeal(meal) {
  //selectmeal is an action creator, an obj with a type property
  //action ALWAYS contains a type, sometimes a payload
  return {
    type: 'MEAL_SELECTED',
    payload: meal
>>>>>>> create Meal List and Meal Detail
  };
}
