import { GET_PURCHASES, POST_PURCHASE } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PURCHASES:
      return _.mapKeys(action.payload.data, 'id');
    case POST_PURCHASE:
      return state;
    default:
      return state;
  }
}
