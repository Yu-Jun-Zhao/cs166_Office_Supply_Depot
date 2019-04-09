import React from "react";

const Product = ({ product }) => {
  const { pName, price, weight, quantity } = product;
  return (
    <div class="row">
      <div class="col s12 m5">
        <div class="card">
          <div class="card-content">
            <span class="card-title">{pName}</span>
            <p>Price: {price}</p>
            <p>Weight: {weight}</p>
            <p>Quantity: {quantity}</p>
          </div>
          <div class="card-action">
            <a href="#">Expand→ </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
