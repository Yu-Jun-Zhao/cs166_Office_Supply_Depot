import {
  FETCH_AUTHENTICATION,
  REMOVE_AUTHENTICATION,
  GET_AUTH_ERRORS,
  REMOVE_AUTH_ERRORS
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  cartId: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTHENTICATION:
      // return the object to store
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        userInfo: action.payload.userInfo,
        cartId: action.payload.cartId
      };
    case REMOVE_AUTHENTICATION:
      return {
        isAuthenticated: false,
        userInfo: {},
        cartId: null,
        error: null
      };
    case GET_AUTH_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case REMOVE_AUTH_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
