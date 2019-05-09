import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProductsByOffset, deleteProduct } from "../../actions/productActions";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//import ReactPaginate from "react-paginate";
// Mainly for Admin

class TableItemsList extends Component {

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
    if (items.products) {
      return (
          <Grid container>
            <Grid item xs={10}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.products.map(product => (
                      <TableRow key={product.id} hover>
                        <TableCell>{product.product_id}</TableCell>
                        <TableCell>{product.p_name}</TableCell>
                        <TableCell>{product.weight}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <Button color="primary" onClick={() => this.props.deleteProduct(product.product_id)}>
                            <i className="material-icons">delete</i>
                          </Button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
      );
    }
    return <div>LOADING</div>
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { fetchProductsByOffset, deleteProduct }
)(TableItemsList);