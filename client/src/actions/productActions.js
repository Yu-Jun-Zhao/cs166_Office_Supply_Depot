import axios from "axios";

import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_OFFSET,
  CHANGE_PAGE, CREATE_PRODUCT_BEGIN, CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_SUCCESS, CLOSE_MODAL
} from "./types";

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = (products, total) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products, total }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export const changeOffset = offset => ({
  type: CHANGE_OFFSET,
  payload: { offset }
});

export const changePage = page => ({
  type: CHANGE_PAGE,
  payload: { page }
});

export const createProductsBegin = () => ({
  type: CREATE_PRODUCT_BEGIN
});

export const createProductsSuccess = () => ({
  type: CREATE_PRODUCT_SUCCESS
});

export const createProductsFailure = error => ({
  type: CREATE_PRODUCT_FAILURE
});

export function fetchProducts(name, offset) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return axios.get(`/api/products/${name}/${offset}`)
      .then(res => dispatch(fetchProductsSuccess(res.data.products, res.data.total)))
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

export function fetchProductsByOffset(offset) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    axios
      .get(`/api/products/${offset}`)
      .then(res => dispatch(fetchProductsSuccess(res.data, offset)))
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

export function createProduct(pName, quantity, price, weight) {
  return dispatch => {
    dispatch(createProductsBegin());
    return axios.post(`/api/product/add`, {
      pName: pName,
      quantity: quantity,
      price: price,
      weight: weight
    })
    .then(res => dispatch(createProductsSuccess()))
    .catch(error => dispatch(createProductsFailure()));
  }
}

export const closeModal = () => ({
  type: CLOSE_MODAL
});

