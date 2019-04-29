import {
  BEGINLOADINGORDERSFROM_DB,
  FINISHLOADINGORDERSFROM_DB,
  LOADALLORDERSFROM_DB
} from "../actions/types";
import axios from "axios";

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

export const getAllOrdersFromDB = userId => dispatch => {
  dispatch(beginLoadingOrderFromDb());

  axios.put(`/api/order/check/${userId}`).then(res =>
    dispatch({
      type: LOADALLORDERSFROM_DB,
      payload: res.data.order
    })
  );
};

export const beginLoadingOrderFromDb = () => {
  return { type: BEGINLOADINGORDERSFROM_DB };
};

export const finishLoadingOrderFromDb = () => {
  return { type: FINISHLOADINGORDERSFROM_DB };
};
