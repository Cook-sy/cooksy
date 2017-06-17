import { FETCH_MEALDETAIL, POST_PURCHASE } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MEALDETAIL:
      return action.payload.data.meal;
    case POST_PURCHASE:
      return { ...state, 'numOrdered': action.payload.data.meal.numOrdered };
    default:
      return state;
  }
}
