import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createProduct
} from "../../actions/productActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class ItemAdder extends Component {

  state = {
    p_name: null,
    quantity: null,
    price: null,
    weight: null,
    description: null,
    imgPath: null,
    type: null,
    warehouse: null
  }

  setField = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (p_name, quantity, price, weight, description, imgPath, type, warehouse) => {
    if (p_name === null) {
      alert('Product name is invalid');
      return;
    }
    if (quantity === null || !quantity.match(/^[0-9]+/)) {
      alert('Invalid quantity or quantity too large');
      return;
    }
    if (price === null || !price.match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/)) {
      alert('Invalid price');
      return;
    }
    if (weight === null || !weight.match(/^[0-9]+([,.][0-9]+)?$/g)) {
      alert('Invalid weight');
      return;
    }
    if (description === null) {
      alert("Invalid description")
      return;
    }
    if (imgPath === null) {
      alert("Invalid image path")
      return;
    }
    if (type === null) {
      alert("Invalid description")
      return;
    }
    if (warehouse === null) {
      alert("Invalid warehouse")
      return;
    }
    this.props.dispatch(createProduct(p_name, quantity, price, weight, description, imgPath, type, warehouse))
  }

  render() {
    const { p_name, quantity, price, weight, description, imgPath, type, warehouse } = this.state
    return (
      <form onChange={this.setField} style={{marginLeft: '2%'}}>
        <Grid container spacing={24}>
          <Grid item xs={2}>
            <TextField
                type="text"
                label="New Item"
                name="p_name"
                fullWidth
            />
          </Grid>

          <Grid item xs={1}>
            <TextField type="number" label="quantity" name="quantity" />
          </Grid>

          <Grid item xs={1}>
            <TextField type="number" label="price" name="price" />
          </Grid>

          <Grid item xs={1}>
            <TextField type="number" label="weight" name="weight" />
          </Grid>

          <Grid item xs={2}>
            <TextField type="text" label="description" name="description" />
          </Grid>

          <Grid item xs={1}>
            <TextField type="text" label="img " name="imgPath" />
          </Grid>
          <Grid item xs={1}>
            <TextField type="text" label="type" name="type" />
          </Grid>
          <Grid item xs={1}>
            <TextField type="number" label="warehouse" name="warehouse" />
          </Grid>
          <Grid item xs={1}>
            <Button color="primary">
              <i className="material-icons" onClick={() => this.handleSubmit(p_name, quantity, price, weight, description, imgPath, type, warehouse)}>add</i>
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default connect()(ItemAdder);
