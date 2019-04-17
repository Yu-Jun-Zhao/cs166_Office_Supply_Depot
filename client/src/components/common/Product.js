import React from "react";

const Product = ({ product }) => {
  const { pName, price, weight, quantity } = product;
  return (
    <React.Fragment>
      <span>{pName}</span>
      <p>Price: ${price}</p>
      <p>Weight: {weight} lbs</p>
      <p>Quantity: {quantity}</p>
      <hr/>
    </React.Fragment>
  );
};

export default Product;
