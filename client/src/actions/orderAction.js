import {
  BEGINLOADINGORDERSFROM_DB,
  FINISHLOADINGORDERSFROM_DB,
  LOADALLORDERSFROM_DB
} from "../actions/types";
import axios from "axios";
import {openModal, setModalProps} from "./modalActions";
import {
  deleteProductsBegin,
  deleteProductsFailure,
  deleteProductsSuccess,
  fetchProductsByOffset
} from "./productActions";

// might not needed in redux
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
    return axios.put(`/api/order/check/${userID}`)
        .then(res => dispatch(loadOrders(res.data.order)))
        .catch(res => alert("error"))

  }
}

export const loadOrders = (orders) => {
  return {
    type: LOADALLORDERSFROM_DB,
    payload: orders
  }
}
export const beginLoadingOrderFromDb = () => {
  return { type: BEGINLOADINGORDERSFROM_DB };
};

export const finishLoadingOrderFromDb = () => {
  return { type: FINISHLOADINGORDERSFROM_DB };
};
