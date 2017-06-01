import { FETCH_MEALS, FETCH_MEALDETAIL } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MEALDETAIL:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_MEALS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
