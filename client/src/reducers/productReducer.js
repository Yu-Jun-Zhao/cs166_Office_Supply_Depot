import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_OFFSET,
  CHANGE_PAGE,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
<<<<<<< HEAD
  CLOSE_MODAL
=======
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
>>>>>>> evan_branch
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  error: null,
  pageCount: 0,
  offset: 0,
  page: 0,
<<<<<<< HEAD
  isModalOpen: false,
  modalType: null
=======
>>>>>>> evan_branch
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
<<<<<<< HEAD
      }
=======
      };
>>>>>>> evan_branch
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
<<<<<<< HEAD
        isModalOpen: true,
        modalType: 'success'
      }
=======
      };
>>>>>>> evan_branch
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
<<<<<<< HEAD
        isModalOpen: true,
        modalType: 'fail'
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false
      }
=======
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
    case UPDATE_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
>>>>>>> evan_branch
    default:
      return state;
  }
}
