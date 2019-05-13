import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  addAllItems,
  deleteCartItem,
  getAllCartItemsFromDB
} from "../../actions/cartActions";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 15,
    tableLayout: "fixed"
  },
  ordertable: {
    boxShadow: "10px 10px 5px #CCC",
    borderRadius: "25px",
    width: 20,
    height: 20,
    left: 10
  },
  noborder: {
    border: theme.palette.common.white,
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  center: {
    margin: "auto",
    width: "80%",
    height: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class Shoppingcart extends Component {
  state = {
    cart: [],
    loadingFromDB: true
  };
  componentDidMount() {
    this.props.getAllCartItemsFromDB(this.props.authentication.cartId);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.authentication.cartId !== prevProps.authentication.cartId)
    {
      this.props.getAllCartItemsFromDB(this.props.authentication.cartId);
      if (JSON.parse(localStorage.getItem('cart')) !== null) {
        console.log(JSON.parse(localStorage.getItem('cart')))
        this.setState({
          cart: JSON.parse(localStorage.getItem('cart'))
        })
      }
      else {
        console.log('notls')
        this.setState({
          cart: this.props.cart
        })
      }
    }
  }

  handleButtonChange = id => event => {
    const tempCart = this.state.cart.filter((item, index) => {
      console.log(id, index)
      return index !== id
    })
    this.props.deleteCartItem(this.props.authentication.cartId, id);
    localStorage.setItem('cart', JSON.stringify(tempCart));
    this.setState({
      cart: tempCart
    })
  };
  
  handleQtyChange = id => event => {
    if (event.target.value <= 0) return;
    const tempCart = this.state.cart;
    for (let i = 0; i < tempCart.length; i++) {
      if (tempCart[i].id === id) {
        tempCart[i].quantity = event.target.value;
      }
    }
    console.log(tempCart)
    localStorage.setItem('cart', JSON.stringify(tempCart));
    this.setState({ cart: tempCart });
  };

  handleCheckOut = event => {
    this.props.addAllItems(this.props.authentication.cartId, this.state.cart);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.cart.cart !== undefined) {
      if (localStorage.getItem('cart') !== null) {
        return {
          cart: JSON.parse(localStorage.getItem('cart'))
        }
      }
      else {
        return {
          cart: nextProps.cart.cart,
          loadingFromDB: nextProps.cart.loadingFromDB
        };
      }
    }
  }

  render() {
    const { classes } = this.props;
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    var subtotal = 0;
    var tax = 0.095;
    var grandtotal = 0;
    var totalWeight = 0;
    var totalQuantity = 0;
    return (
      <div className={classes.root}>
        <div className={classes.center}>
          <br />
          <div>
            <Typography variant="h3">Here's your shopping cart!</Typography>
          </div>
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow className={classes.noborder}>
                      <TableCell>Item</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total Item Weight</TableCell>
                      <TableCell />
                      <TableCell>Item Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.cart.map(row => {
                      const t = row.price * row.quantity;
                      const total = formatter.format(t);
                      subtotal += t;
                      totalQuantity += row.quantity;
                      totalWeight += row.weight * row.quantity;
                      return (
                        <TableRow key={row.id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{formatter.format(row.price)}</TableCell>
                          <TableCell>
                            <FormControl>
                              <TextField
                                id="standard-number"
                                label="Qty"
                                value={row.quantity}
                                onChange={this.handleQtyChange(row.id)}
                                type="number"
                                fontSize="16"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true
                                }}
                                inputProps={{
                                  style: { fontSize: 13 }
                                }}
                              />
                            </FormControl>
                          </TableCell>
                          <TableCell>{(row.weight * row.quantity).toFixed(2)} lbs</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={this.handleButtonChange(row.id)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                          <TableCell>{total}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell>{totalWeight.toFixed(2)} lbs</TableCell>
                      <TableCell> </TableCell>
                      <TableCell>{formatter.format(subtotal)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid
              xs={3}
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <Grid xs={3}>
                <Table className={classes.ordertable}>
                  <TableBody>
                    <TableRow>
                      <TableCell>Subtotal</TableCell>
                      <TableCell>{formatter.format(subtotal)}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Tax({tax * 100}%)</TableCell>
                      {/*<TableCell>{formatter.format(tax * subtotal)}</TableCell> */}
                      <TableCell>N/A</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Grand Total</TableCell>
                      <TableCell>{formatter.format(subtotal)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <br />
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                color="primary"
                onClick={this.handleCheckOut}
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
          <br />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cart: state.cart,
  authentication: state.authentication
});
const shopping = withStyles(styles)(Shoppingcart);
export default withRouter(
  connect(
    mapStateToProps,
    { addAllItems, deleteCartItem, getAllCartItemsFromDB }
  )(shopping)
);
