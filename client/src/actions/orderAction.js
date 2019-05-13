import {
  BEGINLOADINGORDERSFROM_DB,
  FINISHLOADINGORDERSFROM_DB,
  LOADALLORDERSFROM_DB,
  FETCHSHIPPINGADDRESS,
  CHANGE_WAREHOUSE,
  GEOCODE_BEGIN,
  GEOCODE_FAIL,
  CHANGE_ORDER_ID
} from "../actions/types";
import axios from "axios";
import { GEOCODE_SUCCESS } from "./types";

// might not needed in redux
// Create order and store in db
export const createOrder = (
  userId,
  address,
  city,
  state,
  zip,
  f_address,
  delivery_method,
  delivery_time
) => dispatch => {
  const orderData = {
    userId,
    address,
    city,
    state,
    zip,
    f_address,
    delivery_method,
    delivery_time
  };

  axios.post("/api/order/add", orderData).catch(err => console.log(err)); // for now
};

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
  });
};

export const changeOrderId = id => dispatch => {
  dispatch({
    type: CHANGE_ORDER_ID,
    payload: id
  });
};

export const geocodeBegin = () => ({
  type: GEOCODE_BEGIN
});

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
    return axios
      .post("/api/order/route", {
        origin: origin
      })
      .then(res => dispatch(geocodeSuccess(res.data.origin)))
      .catch(error => dispatch(geocodeFailure(error)));
  };
}

export function generateMap(shippingAddressId, warehouseId, orderId) {
  return dispatch => {
    axios
      .get(`/api/order/address/${shippingAddressId}`)
      .then(res => {
        dispatch({ type: FETCHSHIPPINGADDRESS, payload: res.data });
        let fullOrigin = `${res.data.address} ${res.data.city} ${res.data.zip}`;
        axios
          .post("/api/order/route", {
            origin: fullOrigin
          })
          .then(res => dispatch(geocodeSuccess(res.data.origin)))
          .then(res =>
            dispatch({ type: CHANGE_WAREHOUSE, payload: warehouseId })
          )
          .then(res => dispatch({ type: CHANGE_ORDER_ID, payload: orderId }))
          .catch(error => dispatch(geocodeFailure(error)));
      })
      .catch(error => console.log(error));
  };
}
