import { AUTHENTICATE, USER_DETAILS, LOG_OUT } from '../actions';

let initialState = {
  user: {},
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      if (action.error) {
        return {
          ...state, error: action.payload.response.data.message
        };
      } else {
        return {
          ...state, error: ''
        };
      }
    case USER_DETAILS:
      return {
        ...state, user: action.payload
      }
    case LOG_OUT:
      return {
        ...state, user: {}
      };
    default:
      return state;
  }
}
