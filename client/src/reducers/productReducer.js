import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_OFFSET,
  CHANGE_PAGE
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  error: null,
  pageCount: 0,
  offset: 0,
  page: 0
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
        pageCount: Math.ceil(action.payload.total / 10)
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
    case CHANGE_OFFSET:
      return {
        ...state,
        offset: action.payload.offset
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page
      };
    default:
      return state;
  }
}
