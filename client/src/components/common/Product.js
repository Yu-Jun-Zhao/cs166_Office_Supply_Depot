import React from "react";

const Product = ({ product }) => {
  const { p_name, price, weight, quantity } = product;
  return (
<<<<<<< HEAD
    <React.Fragment>
      <span>{pName}</span>
      <p>Price: ${price}</p>
      <p>Weight: {weight} lbs</p>
      <p>Quantity: {quantity}</p>
      <hr/>
    </React.Fragment>
=======
    <div class="row">
      <div class="col s12 m5">
        <div class="card">
          <div class="card-content">
            <span class="card-title">{p_name}</span>
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
>>>>>>> evan_branch
  );
};

export default Product;
