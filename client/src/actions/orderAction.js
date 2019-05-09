import {
  BEGINLOADINGORDERSFROM_DB,
  FINISHLOADINGORDERSFROM_DB,
  LOADALLORDERSFROM_DB,
  FETCHSHIPPINGADDRESS
} from "../actions/types";
import axios from "axios";

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
