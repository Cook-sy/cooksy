import { FETCH_TODAYS_MEALS } from '../actions/mealsActions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TODAYS_MEALS:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
