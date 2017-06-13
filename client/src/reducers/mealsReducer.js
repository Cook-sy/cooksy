import {
  FETCH_MEALS,
  CREATE_MEAL,
  FETCH_MEALS_BY_CHEF,
  GET_NEAR_BY_MEALS,
  FETCH_MEALS_BY_DATE
} from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MEALS:
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_MEALS_BY_CHEF:
      return _.mapKeys(action.payload.data, 'id');
    case GET_NEAR_BY_MEALS:
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_MEALS_BY_DATE:
      return _.mapKeys(action.payload, 'id');
    case CREATE_MEAL:
      return { ...state, [action.payload.data.meal.id]: action.payload.data.meal };
    default:
      return state;
  }
}
