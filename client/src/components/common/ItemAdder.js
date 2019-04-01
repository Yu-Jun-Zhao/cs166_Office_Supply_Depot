import React, { Component } from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//import ReactPaginate from "react-paginate";
// Mainly for Admin

class ItemAdder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <form>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextField
              type="text"
              label="New Item"
              id="new_item_text"
              fullWidth
            />
          </Grid>

          <Grid item xs={1}>
            <TextField type="number" label="weight" id="new_item_weight" />
          </Grid>

          <Grid item xs={2}>
            <TextField type="number" label="quantity" id="new_item_quantity" />
          </Grid>

          <Grid item xs={2}>
            <TextField type="number" label="price" id="new_item_price" />
          </Grid>

          <Grid item xs={1}>
            <Button color="primary">
              <i className="material-icons">add</i>
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default connect()(ItemAdder);
