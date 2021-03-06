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
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS
} from "./types";
import { openModal, setModalProps } from "./modalActions";

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
    return axios
      .get(`/api/products/o1/${name}/${offset}`)
      .then(res =>
        dispatch(fetchProductsSuccess(res.data.products, res.data.total))
      )
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

export function fetchFirstXProducts(x) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    axios
      .get(`/api/products/all/${x}`)
      .then(res =>
        dispatch(fetchProductsSuccess(res.data.products, res.data.total))
      )
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

export const fetchProductByType = (type, offset) => dispatch => {
  dispatch(fetchProductsBegin());
  axios
    .get(`/api/products/all/type/${type}/${offset}`)
    .then(res =>
      dispatch(fetchProductsSuccess(res.data.products, res.data.total))
    )
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

export function createProduct(
  p_name,
  quantity,
  price,
  weight,
  description,
  imgPath,
  type,
  warehouse
) {
  return dispatch => {
    dispatch(createProductsBegin());
    return axios
      .post(`/api/products/add`, {
        p_name: p_name,
        quantity: quantity,
        price: price,
        weight: weight,
        description: description,
        imgPath: imgPath,
        type: type,
        warehouse: warehouse
      })
      .then(res => dispatch(createProductsSuccess()))
      .then(res => dispatch(openModal()))
      .then(res =>
        dispatch(
          setModalProps({
            status: "SUCCESS",
            message: "Product successfully added"
          })
        )
      )
      .then(res => dispatch(fetchFirstXProducts(0)))
      .catch(error => {
        dispatch(openModal());
        dispatch(
          setModalProps({ status: "FAIL", message: "Product addition failed" })
        );
        dispatch(createProductsFailure());
      });
  };
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

export function deleteProduct(product_id, offset) {
  return dispatch => {
    dispatch(deleteProductsBegin());
    return axios
      .post(`/api/products/delete`, {
        product_id: product_id
      })
      .then(res => dispatch(deleteProductsSuccess()))
      .then(res => dispatch(openModal()))
      .then(res =>
        dispatch(
          setModalProps({
            status: "SUCCESS",
            message: "Product successfully deleted"
          })
        )
      )
      .then(res => dispatch(fetchFirstXProducts(offset)))
      .catch(error => {
        dispatch(openModal());
        dispatch(
          setModalProps({ status: "FAIL", message: "Product deletion failed" })
        );
        dispatch(deleteProductsFailure());
      });
  };
}

export const updateProductsBegin = () => ({
  type: UPDATE_PRODUCT_BEGIN
});

export const updateProductsSuccess = () => ({
  type: UPDATE_PRODUCT_SUCCESS
});

export const updateProductsFailure = () => ({
  type: UPDATE_PRODUCT_FAILURE
});

export function updateProduct(
  product_id,
  p_name,
  quantity,
  price,
  weight,
  description,
  imgPath,
  type,
  offset
) {
  return dispatch => {
    dispatch(updateProductsBegin());
    return axios
      .post(`/api/products/update`, {
        product_id: product_id,
        p_name: p_name,
        quantity: quantity,
        price: price,
        weight: weight,
        description: description,
        imgPath: imgPath,
        type: type
      })
      .then(res => dispatch(updateProductsSuccess()))
      .then(res => dispatch(openModal()))
      .then(res =>
        dispatch(
          setModalProps({
            status: "SUCCESS",
            message: "Product successfully updated"
          })
        )
      )
      .then(res => dispatch(fetchFirstXProducts(offset)))
      .catch(error => {
        dispatch(openModal());
        dispatch(
          setModalProps({ status: "FAIL", message: "Product update failed" })
        );
        dispatch(updateProductsFailure());
      });
  };
}
