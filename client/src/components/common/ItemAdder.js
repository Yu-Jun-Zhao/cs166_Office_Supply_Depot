import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createProduct
} from "../../actions/productActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//import ReactPaginate from "react-paginate";
// Mainly for Admin

class ItemAdder extends Component {

  state = {
    pName: null,
    quantity: null,
    price: null,
    weight: null
  }

  componentDidMount() {}

  setField = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { pName, quantity, price, weight } = this.state
    return (
      <form onChange={this.setField}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextField
              type="text"
              label="New Item"
              name="pName"
              fullWidth
            />
          </Grid>

          <Grid item xs={1}>
            <TextField type="number" label="weight" name="weight" />
          </Grid>

          <Grid item xs={2}>
            <TextField type="number" label="quantity" name="quantity" />
          </Grid>

          <Grid item xs={2}>
            <TextField type="number" label="price" name="price" />
          </Grid>

          <Grid item xs={1}>
            <Button color="primary">
              <i className="material-icons" onClick={() => this.props.dispatch(createProduct(pName, weight, quantity, price))}>add</i>
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default connect()(ItemAdder);
