import { FETCH_TODAYS_MEALS } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TODAYS_MEALS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
