import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteProduct,
  updateProduct,
  fetchFirstXProducts,
  changeOffset, changePage
} from "../../actions/productActions";
import "../../index.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditableTableCell from "./EditableTableCell";
import ReactPaginate from "react-paginate";
// Mainly for Admin

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

class TableItemsList extends Component {

  state = {
    rowsChanges: {}
  };

  componentDidMount() {
    this.props.fetchFirstXProducts(0);
  }

  componentDidUpdate(prevProps) {
    if(this.props.products !== prevProps.products)
    {
      if (this.props.products) {
        this.props.products.map((row, index) => {
          let temp = this.state.rowsChanges
          temp[index] = row
          this.setState({
            rowsChanges: temp
          })
        });
      }
    }
  }

  handleSave = (rowIndex) => {
    const product = this.state.rowsChanges[rowIndex]
    this.props.updateProduct(product.product_id, product.p_name, product.quantity, product.price, product.weight, product.description, product.imgPath, product.type, this.props.offset)
  }

  handleDelete = (rowIndex) => {
    const product = this.state.rowsChanges[rowIndex]
    this.props.deleteProduct(product.product_id, this.props.offset)
  }

  handleTextFieldChange(rowIndex,change) {
    this.setState(prevState => ({
      rowsChanges: {
        ...prevState.rowsChanges,
        [rowIndex]: {...prevState.rowsChanges[rowIndex],[change.fieldName]: change.fieldValue}
      }
    }));
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
    this.props.changeOffset(offset);
    this.props.changePage(selected);
    this.props.fetchFirstXProducts(offset);
  };

  render() {
    const { loading, products, pageCount, page } = this.props;
    if (loading) {
      return (
        <div>
          <h2>Loading Items</h2>
        </div>
      );
    }
    return (
        <React.Fragment>
        <Grid container>
          <Grid>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Warehouse</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products && products.map((row, index) => {
                  return (
                      <TableRow key={row.product_id}>
                        <TableCell padding="dense"> {row.product_id}</TableCell>
                        <EditableTableCell
                            row={row}
                            fieldName="p_name"
                            onCellValueChange={this.handleTextFieldChange.bind(this,index)}
                            style={{width: '190px'}}

                        />
                        <EditableTableCell
                            row={row}
                            fieldName="quantity"
                            onCellValueChange={this.handleTextFieldChange.bind(this,index)}
                            style={{width: '20px'}}
                        />
                        <EditableTableCell
                            row={row}
                            fieldName="price"
                            onCellValueChange={this.handleTextFieldChange.bind(this,index)}
                            style={{width: '23px'}}
                        />
                        <EditableTableCell
                            row={row}
                            fieldName="weight"
                            onCellValueChange={this.handleTextFieldChange.bind(this,index)}
                            style={{width: '23px'}}
                        />
                        <EditableTableCell
                            row={row}
                            fieldName="description"
                            onCellValueChange={this.handleTextFieldChange.bind(this,index)}
                        />
                        <EditableTableCell
                            row={row}
                            fieldName="type"
                            onCellValueChange={this.handleTextFieldChange.bind(this,index)}
                        />
                        <EditableTableCell
                            row={row}
                            fieldName="imgPath"
                            onCellValueChange={this.handleTextFieldChange.bind(this,index)}
                        />
                        <EditableTableCell
                            row={row}
                            fieldName="warehouse"
                            onCellValueChange={this.handleTextFieldChange.bind(this,index)}
                            style={{width: '23px'}}
                        />
                        <TableCell padding="none">
                          <Button
                              onClick={() => this.handleSave(index, row)}
                              variant="outlined"
                          >
                            Update
                          </Button>
                        </TableCell>
                        <TableCell padding="none">
                          <Button
                              onClick={() => this.handleDelete(index, row)}
                              variant="outlined"
                          >
                            DELETE
                          </Button>
                        </TableCell>
                      </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
          <div className="paginator">
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={10}
                forcePage={page}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
          </div>
        </React.Fragment>
    );
    return <div>LOADING</div>
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  page: state.products.page,
  pageCount: state.products.pageCount,
  offset: state.products.offset
});

export default connect(
  mapStateToProps,
  { fetchFirstXProducts, deleteProduct, updateProduct, changeOffset, changePage }
)(TableItemsList);