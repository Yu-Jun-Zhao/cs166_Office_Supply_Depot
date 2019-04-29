import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

// The actual name for authentication is user
// TODO: change authentication to user

export default combineReducers({
  products: productReducer,
  authentication: authReducer,
  cart: cartReducer
});
