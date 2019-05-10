import React from "react";

const Product = ({ product }) => {
  const { p_name, price, weight, quantity } = product;
  return (
    <div>
      <div>
        <div>
          <div>
            <span >{p_name}</span>
            <p>Price: {price}</p>
            <p>Weight: {weight}</p>
            <p>Quantity: {quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
