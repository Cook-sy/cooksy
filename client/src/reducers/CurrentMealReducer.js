import { FETCH_MEALDETAIL } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MEALDETAIL:
      return action.payload.data.meal;
    default:
      return state;
  }
}
