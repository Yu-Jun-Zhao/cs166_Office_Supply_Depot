import {
  ADDITEM_TOCART,
  DELETEITEM_FROMCART,
  LOADALLITEMSFROM_DB
} from "../actions/types";

const initialState = {
  cart: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDITEM_TOCART: {
      return {};
    }
    case DELETEITEM_FROMCART:
      return {};
    case LOADALLITEMSFROM_DB:
      return {
        cart: action.payload
      };
    default:
      return state;
  }
}
