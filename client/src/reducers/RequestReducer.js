import { 
	CREATE_REQUEST,
	ORDER_REQUESTED_MEAL,
	GET_CHEF_REQUESTS,
	GET_USER_REQUESTS,
	GET_REQUEST_BY_ID,
  GET_ALL_REQUESTS
} from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CHEF_REQUESTS:
      return _.mapKeys(action.payload.data, 'id');
    case GET_USER_REQUESTS:
      return _.mapKeys(action.payload.data, 'requestId');
    case GET_ALL_REQUESTS:
      return _.mapKeys(action.payload.data, 'id');
    case GET_REQUEST_BY_ID:
      return _.mapKeys(action.payload.data.request, 'id');
    case CREATE_REQUEST:
      return state;
    case ORDER_REQUESTED_MEAL:
      return { ...state, [action.payload.data.request.requestId]: action.payload.data.request };
    default:
      return state;
  }
};