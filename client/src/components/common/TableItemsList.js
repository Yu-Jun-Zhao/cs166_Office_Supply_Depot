import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProductsByOffset } from "../../actions/productActions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

//import ReactPaginate from "react-paginate";
// Mainly for Admin

class TableItemsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProductsByOffset(100);
  }

  render() {
    const { loading, items } = this.props.products;
    if (loading) {
      return (
        <div>
          <h2>Loading Items</h2>
        </div>
      );
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.products.map(product => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.pName}</TableCell>
                  <TableCell>{product.weight}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { fetchProductsByOffset }
)(TableItemsList);
