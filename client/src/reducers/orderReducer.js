import {
  BEGINLOADINGORDERSFROM_DB,
  FINISHLOADINGORDERSFROM_DB,
  LOADALLORDERSFROM_DB,
  FETCHSHIPPINGADDRESS
} from "../actions/types";

const initialState = {
<<<<<<< HEAD
  order: null,
  loadingFromDB: false
=======
  order: [],
  loadingFromDB: false,
  shippingAddress: {} // shipping address of the one shown in map
>>>>>>> e69353faca1f44b58a755aec105359578605e6f3
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BEGINLOADINGORDERSFROM_DB:
      return {
        ...state,
        loadingFromDB: true
      };
    case LOADALLORDERSFROM_DB:
      return {
        ...state,
        order: action.payload
      };
    case FINISHLOADINGORDERSFROM_DB:
      return {
        ...state,
        loadingFromDB: false
      };
    case FETCHSHIPPINGADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      };
    default:
      return state;
  }
}
