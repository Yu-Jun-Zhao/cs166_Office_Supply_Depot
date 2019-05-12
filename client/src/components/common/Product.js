import React from "react";

const Product = ({ product }) => {
  const { p_name, product_id, price, weight, quantity } = product;
  return (
    <div>
      <div>
        <div>
          <div>
            <span >{p_name}</span>
            <p>ID: {product_id}</p>
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
