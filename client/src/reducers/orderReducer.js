import {
  BEGINLOADINGORDERSFROM_DB,
  FINISHLOADINGORDERSFROM_DB,
  LOADALLORDERSFROM_DB,
  FETCHSHIPPINGADDRESS,
  CHANGE_WAREHOUSE, GEOCODE_BEGIN, GEOCODE_SUCCESS, GEOCODE_FAIL, CHANGE_ORDER_ID
} from "../actions/types";

const initialState = {
  order: [],
  loadingFromDB: false,
  shippingAddress: {}, // shipping address of the one shown in map
  warehouse: 0,
  origin: {},
  order_id: null,
  eta: null
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
    case CHANGE_WAREHOUSE:
      return {
        ...state,
        warehouse: action.payload
      }
    case CHANGE_ORDER_ID:
      return {
        ...state,
        order_id: action.payload
      }
    case GEOCODE_BEGIN:
      return {
        ...state,
        loadingFromDB: true
      }
    case GEOCODE_SUCCESS:
      return {
        ...state,
        loadingFromDB: false,
        origin: action.payload.origin,
        eta: action.payload.eta
      }
    case GEOCODE_FAIL:
      return {
        ...state,
        loadingFromDB: false
      }
    default:
      return state;
  }
}
