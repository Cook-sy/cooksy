import { FETCH_MEALS, FETCH_MEALDETAIL, CREATE_MEAL } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MEALDETAIL:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_MEALS:
      return _.mapKeys(action.payload.data, 'id');
    case CREATE_MEAL:
      return { ...state, [action.payload.data.meal.id]: action.payload.data.meal };
    default:
      return state;
  }
}
