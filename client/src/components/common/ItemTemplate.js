import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: "100%"
  }
});

class ItemTemplate extends React.Component{
  render() {
    const { classes } = this.props;
    return (
      <ItemTemplate1 product />
    );
  }
}

const ItemTemplate1 = ({ product }) => {
  const { name, price, weight, description, quantity } = product
  return (
  <div className={"classes.root"}>
    <div>
        <Grid item xs>
          <h2>Name{name}</h2>
        </Grid>
        <Grid item xs>
          <h2>image</h2>
        </Grid>
        <Divider />
        <Grid item xs>
          <h3>Price: {price}</h3>
        </Grid>
        <Grid item xs>
          <h4>Weight: {weight}</h4>
          <h4>Description{description}</h4>
        </Grid>
    </div>
    <Divider variant="middle" />
    <br />
    <div align="center">
      <Button component={Link} to="/shopping-cart" variant="contained" color="blue">
        Add to cart
      </Button>
    </div>
  </div>
  );
}

ItemTemplate.propTypes = {
  name: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
  weight: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired,
  quantity: PropTypes.object.isRequired,
}

export default withStyles(styles)(ItemTemplate);
