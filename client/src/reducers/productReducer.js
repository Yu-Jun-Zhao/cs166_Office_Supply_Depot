import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_OFFSET,
  CHANGE_PAGE,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  CLOSE_MODAL
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  error: null,
  pageCount: 0,
  offset: 0,
  page: 0,
  isModalOpen: false,
  modalType: null
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        items: []
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
        pageCount: Math.ceil(action.payload.total / 16)
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
    case CREATE_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isModalOpen: true,
        modalType: 'success'
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        isModalOpen: true,
        modalType: 'fail'
      };
    case DELETE_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false
      };
    default:
      return state;
  }
}
