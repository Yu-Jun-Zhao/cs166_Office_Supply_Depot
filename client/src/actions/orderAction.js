import {
  BEGINLOADINGORDERSFROM_DB,
  FINISHLOADINGORDERSFROM_DB,
  LOADALLORDERSFROM_DB,
  FETCHSHIPPINGADDRESS,
  CHANGE_WAREHOUSE, GEOCODE_BEGIN, FETCH_PRODUCTS_FAILURE, GEOCODE_FAIL, CHANGE_ORDER_ID
} from "../actions/types";
import axios from "axios";
import {GEOCODE_SUCCESS} from "./types";
import {
  createProductsBegin, createProductsFailure,
  createProductsSuccess,
  fetchProductsBegin, fetchProductsByOffset,
  fetchProductsFailure,
  fetchProductsSuccess
} from "./productActions";
import {openModal, setModalProps} from "./modalActions";

// might not needed in redux
// Create order and store in db
export const createOrder = (
  userId,
  address,
  city,
  state,
  zip,
  f_address
) => dispatch => {
  const orderData = {
    userId,
    address,
    city,
    state,
    zip,
    f_address
  };

  axios.post("/api/order/add", orderData).catch(err => console.log(err)); // for now
};
/*

// Fetch all the orders from db that this person has
export const getAllOrdersFromDB = userId => dispatch => {
  dispatch(beginLoadingOrderFromDb());

  axios.put(`/api/order/check/${userId}`)
      .then(res =>
      dispatch({
        type: LOADALLORDERSFROM_DB,
        payload: res.data.order
      })
          .then(res => dispatch(FINISHLOADINGORDERSFROM_DB))
          .catch(res => alert("error"))
  );
};
*/

export function getAllOrdersFromDB(userID) {
  return dispatch => {
    dispatch(beginLoadingOrderFromDb());
    return axios
      .put(`/api/order/check/${userID}`)
      .then(res => dispatch(loadOrders(res.data.order)))
      .catch(res => alert("error"));
  };
}

export const loadOrders = orders => {
  return {
    type: LOADALLORDERSFROM_DB,
    payload: orders
  };
};
// fetch shipping address by the addressId
// addressId could be obtained from getAllOrdersFromDB
export const retrieveShippingAddress = addressId => dispatch => {
  axios
    .get(`/api/order/address/${addressId}`)
    .then(res => dispatch({ type: FETCHSHIPPINGADDRESS, payload: res.data }))
    .catch(err => console.log(err));
};

export const beginLoadingOrderFromDb = () => {
  return { type: BEGINLOADINGORDERSFROM_DB };
};

export const finishLoadingOrderFromDb = () => {
  return { type: FINISHLOADINGORDERSFROM_DB };
};

export const changeWarehouse = warehouse => dispatch => {
  dispatch({
    type: CHANGE_WAREHOUSE,
    payload: warehouse
  })
};

export const changeOrderId = id => dispatch => {
  dispatch({
    type: CHANGE_ORDER_ID,
    payload: id
  })
};

export const geocodeBegin = () => ({
  type: GEOCODE_BEGIN
})

export const geocodeSuccess = origin => ({
  type: GEOCODE_SUCCESS,
  payload: origin
});

export const geocodeFailure = error => ({
  type: GEOCODE_FAIL,
  payload: { error }
});

export function geocodeOrigin(origin) {
  return dispatch => {
    dispatch(geocodeBegin());
    return axios.post('/api/order/route', {
      origin: origin
    })
        .then(  res => dispatch(geocodeSuccess(res.data.origin)))
        .catch(error => dispatch(geocodeFailure(error)));
  };
}

export function generateMap(shippingAddressId, warehouseId, orderId) {
  return dispatch => {
    axios
        .get(`/api/order/address/${shippingAddressId}`)
        .then(res => {
          dispatch({ type: FETCHSHIPPINGADDRESS, payload: res.data })
          let fullOrigin = `${res.data.address} ${res.data.city} ${res.data.zip}`
          axios.post('/api/order/route', {
            origin: fullOrigin
          })
              .then(  res => dispatch(geocodeSuccess(res.data.origin)))
              .then(res => dispatch({ type: CHANGE_WAREHOUSE, payload: warehouseId}))
              .then(res => dispatch({type: CHANGE_ORDER_ID, payload: orderId}))
              .catch(error => dispatch(geocodeFailure(error)));
        })
        .catch(error => console.log(error))
  }
}

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
        .then(res => dispatch(openModal()))
        .then(res => dispatch(setModalProps({ status: 'SUCCESS', message: 'Product successfully added' })))
        .then(res => dispatch(fetchProductsByOffset(100)))
        .catch(error => {
          dispatch(openModal())
          dispatch(setModalProps( {status: 'FAIL', message: 'Product addition failed' }))
          dispatch(createProductsFailure())
        })
  }
}