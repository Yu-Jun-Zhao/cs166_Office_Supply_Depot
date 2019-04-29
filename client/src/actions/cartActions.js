import {
  ADDITEM_TOCART,
  DELETEITEM_FROMCART,
  LOADALLITEMSFROM_DB
} from "./types";
import axios from "axios";

// Add cart item locally and in db

export const addCartItem = (userCartId, product_id, quantity) => dispatch => {
  const itemData = {
    cartId: userCartId,
    productId: product_id,
    quantity
  };
  axios.post("/api/cart/add", itemData).catch(err => console.log(err)); // for now
};

// Add all items
export const addAllItems = (userCartId, cart) => dispatch => {
  for (var i = 0; i < cart.length; i++) {
    const itemData = {
      cartId: userCartId,
      productId: cart[i].id,
      quantity: cart[i].quantity
    };
    console.log(i);
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
  console.log(itemData);
  axios
    .post("/api/cart/remove", itemData)
    .then(res => dispatch(getAllCartItemsFromDB(userCartId)))
    .catch(err => console.log(err));
};

// Get all cart items when user goes to cart page
export const getAllCartItemsFromDB = cartId => dispatch => {
  axios.get(`/api/cart/all/${cartId}`).then(res => {
    dispatch({ type: LOADALLITEMSFROM_DB, payload: res.data.cart });
  });
};
