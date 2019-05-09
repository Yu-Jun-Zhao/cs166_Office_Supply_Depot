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
<<<<<<< HEAD
    pName: null,
    quantity: null,
    price: null,
    weight: null
=======
    p_name: null,
    quantity: null,
    price: null,
    weight: null,
    description: null,
    imgPath: null,
    type: null
>>>>>>> evan_branch
  }

  setField = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  setField = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
<<<<<<< HEAD
    const { pName, quantity, price, weight } = this.state
    return (
      <form onChange={this.setField}>
=======
    const { p_name, quantity, price, weight, description, imgPath, type } = this.state
    return (
      <form onChange={this.setField} style={{marginLeft: '2%'}}>
>>>>>>> evan_branch
        <Grid container spacing={24}>
          <Grid item xs={2}>
            <TextField
<<<<<<< HEAD
              type="text"
              label="New Item"
              name="pName"
              fullWidth
=======
                type="text"
                label="New Item"
                name="p_name"
                fullWidth
>>>>>>> evan_branch
            />
          </Grid>

          <Grid item xs={1}>
<<<<<<< HEAD
            <TextField type="number" label="weight" name="weight" />
          </Grid>

          <Grid item xs={2}>
            <TextField type="number" label="quantity" name="quantity" />
          </Grid>

          <Grid item xs={2}>
            <TextField type="number" label="price" name="price" />
=======
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
>>>>>>> evan_branch
          </Grid>

          <Grid item xs={1}>
            <TextField type="text" label="img " name="imgPath" />
          </Grid>
          <Grid item xs={1}>
            <TextField type="text" label="type" name="type" />
          </Grid>
          <Grid item xs={1}>
            <Button color="primary">
<<<<<<< HEAD
              <i className="material-icons" onClick={() => this.props.dispatch(createProduct(pName, weight, quantity, price))}>add</i>
=======
              <i className="material-icons" onClick={() => this.props.dispatch(createProduct(p_name, quantity, price, weight, description, imgPath, type))}>add</i>
>>>>>>> evan_branch
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default connect()(ItemAdder);
