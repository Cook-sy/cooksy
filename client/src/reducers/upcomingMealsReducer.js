import { FETCH_UPCOMING_MEALS } from '../actions/mealsActions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_UPCOMING_MEALS:
      return _.mapKeys(action.data, 'id');
    default:
      return state;
  }
}