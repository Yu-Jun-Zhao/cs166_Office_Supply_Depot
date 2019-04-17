import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Product = ({ product }) => {
  const { pName, price, weight, quantity } = product;
  return (
    <div class="row">
      <div class="col s12 m5">
        <div class="classes.card">
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
