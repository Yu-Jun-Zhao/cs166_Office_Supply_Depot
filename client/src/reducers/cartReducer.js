import { ADDITEM_TOCART, DELETEITEM_FROMCART } from "../actions/types";

const initialState = {
  cart: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDITEM_TOCART:
      return {};

    case DELETEITEM_FROMCART:
      return {};

    default:
      return state;
  }
}
