import {
  BEGINLOADINGORDERSFROM_DB,
  FINISHLOADINGORDERSFROM_DB,
  LOADALLORDERSFROM_DB
} from "../actions/types";

const initialState = {
  order: [],
  loadingFromDB: false
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
    default:
      return state;
  }
}
