import { AUTHENTICATE, USER_DETAILS, LOG_OUT, SELECT_USER_ROLE } from '../actions';

let initialState = {
  user: {},
  error: '',
  signUpAsUser: ''
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
    case SELECT_USER_ROLE:
      return {
        ...state, signUpAsUser: action.payload
      }
    default:
      return state;
  }
}
