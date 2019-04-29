import axios from "axios";

import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_OFFSET,
  CHANGE_PAGE,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  CLOSE_MODAL
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

export const fetchProductByType = type => dispatch => {
  dispatch(fetchProductsBegin());
  axios
    .get(`/api/products/all/type/${type}`)
    .then(res => dispatch(fetchProductsSuccess(res.data, res.data.length)))
    .catch(error => dispatch(fetchProductsFailure(error)));
};


export const createProductsBegin = () => ({
  type: CREATE_PRODUCT_BEGIN
});

export const createProductsSuccess = () => ({
  type: CREATE_PRODUCT_SUCCESS
});

export const createProductsFailure = () => ({
  type: CREATE_PRODUCT_FAILURE
});

export function createProduct(p_name, quantity, price, weight, description, imgPath, type) {
  return dispatch => {
    dispatch(createProductsBegin());
    return axios.post(`/api/products/add`, {
      p_name: p_name,
      quantity: quantity,
      price: price,
      weight: weight,
      description: description,
      imgPath: imgPath,
      type: type
    })
        .then(res => dispatch(createProductsSuccess()))
        .then(res => dispatch(fetchProductsByOffset(100)))
        .catch(error => dispatch(createProductsFailure()));
  }
}

export const deleteProductsBegin = () => ({
  type: DELETE_PRODUCT_BEGIN
});

export const deleteProductsSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS
});

export const deleteProductsFailure = () => ({
  type: DELETE_PRODUCT_FAILURE
});

export function deleteProduct(product_id) {
  return dispatch => {
    dispatch(createProductsBegin());
    return axios.post(`/api/products/delete`, {
      product_id: product_id
    })
        .then(res => dispatch(deleteProductsSuccess()))
        .then(res => dispatch(fetchProductsByOffset(100)))
        .catch(error => dispatch(createProductsFailure()));
  }
}