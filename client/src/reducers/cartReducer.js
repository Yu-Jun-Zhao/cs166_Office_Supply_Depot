import {
  ADDITEM_TOCART,
  DELETEITEM_FROMCART,
  LOADALLITEMSFROM_DB,
  BEGINLOADINGFROM_DB,
  FINISHLOADINGFROM_DB
} from "../actions/types";

const initialState = {
  cart: [],
  loadingFromDB: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDITEM_TOCART: {
      return {};
    }
    case DELETEITEM_FROMCART:
      return {};
    case BEGINLOADINGFROM_DB:
      return {
        ...state,
        loadingFromDB: true
      };
    case LOADALLITEMSFROM_DB:
      return {
        ...state,
        cart: action.payload
      };
    case FINISHLOADINGFROM_DB:
      return {
        ...state,
        loadingFromDB: false
      };
    default:
      return state;
  }
}
