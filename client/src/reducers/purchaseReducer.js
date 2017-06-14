import { GET_PURCHASES } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PURCHASES:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
