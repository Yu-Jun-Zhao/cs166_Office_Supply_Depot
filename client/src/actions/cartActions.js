import {
  LOADALLITEMSFROM_DB,
  BEGINLOADINGFROM_DB,
  FINISHLOADINGFROM_DB
} from "./types";
import axios from "axios";
import {openModal, setModalProps} from "./modalActions";

// Add cart item locally and in db

export const addCartItem = (userCartId, product_id, quantity) => dispatch => {
  const itemData = {
    cartId: userCartId,
    productId: product_id,
    quantity
  };

  console.log(itemData)
  axios.post("/api/cart/add", itemData)
      .then(res => dispatch(openModal()))
      .then(res => dispatch(setModalProps({ status: 'SUCCESS', message: 'Product successfully added to cart' })))
      .catch(error => {
        dispatch(openModal())
        dispatch(setModalProps( {status: 'FAIL', message: 'Failed to add product to cart' }))
      })};

// Add all items
export const addAllItems = (userCartId, cart) => dispatch => {
  for (var i = 0; i < cart.length; i++) {
    const itemData = {
      cartId: userCartId,
      productId: cart[i].id,
      quantity: cart[i].quantity
    };
    axios.post("/api/cart/add", itemData).catch(err => console.log(err));
  }
};

// delete cart item locally and in db
// Load db cart to store
export const deleteCartItem = (userCartId, product_id) => dispatch => {
  const itemData = {
    cartId: userCartId,
    productId: product_id
  };
  axios
    .post("/api/cart/remove", itemData)
    .then(res => dispatch(getAllCartItemsFromDB(userCartId)))
    .catch(err => console.log(err));
};

// Get all cart items when user goes to cart page
export const getAllCartItemsFromDB = cartId => dispatch => {
  dispatch(loadingFromDB());
  axios.get(`/api/cart/all/${cartId}`).then(res => {
    dispatch({ type: LOADALLITEMSFROM_DB, payload: res.data.cart });
  });
};

export const loadingFromDB = () => {
  return {
    type: BEGINLOADINGFROM_DB
  };
};

export const FinishLoadingFromDB = () => {
  return {
    type: FINISHLOADINGFROM_DB
  };
};
