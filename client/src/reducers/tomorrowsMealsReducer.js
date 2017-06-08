import { FETCH_TOMORROWS_MEALS } from '../actions/mealsActions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TOMORROWS_MEALS:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}