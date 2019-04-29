import React, { Component } from "react";
import {
  getAllCartItemsFromDB,
  FinishLoadingFromDB
} from "../../actions/cartActions";
import { createOrder } from "../../actions/orderAction";
import { connect } from "react-redux";

import "../../style/checkout.css";
//import "typeface-roboto";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//import visa from "./visa.jpg";
//import master from "./mastercard.png";
//import maestro from "./maestro.jpg";
//import discover from "./discover.png";
//import americanexpress from "./americanexpress.jpg";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import { fetchProductByType } from "../../actions/productActions";

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      loadingFromDB: false,
      address: null,
      city: null,
      adState: null,
      zip: null
    };
  }

  componentDidMount() {
    this.props.getAllCartItemsFromDB(this.props.authentication.cartId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.cart.cart !== undefined && nextProps.cart.loadingFromDB) {
      nextProps.FinishLoadingFromDB();

      return {
        cart: nextProps.cart.cart,
        loadingFromDB: nextProps.cart.loadingFromDB
      };
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    //console.log(this.state.address);
    //console.log(this.state.city);
    //console.log(this.state.adState);
    //console.log(this.state.zip);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { address, city, adState, zip } = this.state;
    if (address !== null && city !== null && adState !== null && zip !== null) {
      this.props.createOrder(
        this.props.authentication.userInfo.sub,
        address,
        city,
        adState,
        zip,
        0
      );
    }
  };

  render() {
    const iconsize = {
      width: "5%",
      height: "5%",
      marginLeft: "6.5%"
    };

    const hder = {
      padding: "0.5% 0% 0% 45%"
    };

    const subhder = {
      background: "black",
      margin: "2% 10% 0% 10%",
      paddingLeft: "30px",
      paddingTop: "10px",
      height: "50px",
      color: "white"
    };

    const table = {
      margin: "0% 10% 0% 10%"
    };

    var subtotal = 0;
    var shippingFee = 0;
    return (
      <React.Fragment>
        <div style={{ alignItems: "flex-inline" }}>
          <div>
            <h2 style={hder}>CHECKOUT</h2>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <h4 style={subhder}>1. SHIPPING</h4>

              <div
                style={{
                  margin: "0% 10% 2% 10%"
                }}
              >
                <Paper>
                  <TextField
                    id="street"
                    name="street"
                    label="Street"
                    value={this.state.address}
                    onChange={this.handleChange("address")}
                    placeholder="Street"
                    margin="normal"
                    variant="outlined"
                    required
                    style={{ width: "86.5%", marginLeft: "6.5%" }}
                  />{" "}
                  &nbsp;&nbsp;&nbsp;
                  <TextField
                    id="city"
                    name="city"
                    label="City"
                    value={this.state.city}
                    onChange={this.handleChange("city")}
                    placeholder="City"
                    margin="normal"
                    variant="outlined"
                    style={{ width: "29.2%", marginLeft: "6.5%" }}
                    required
                  />{" "}
                  &nbsp;&nbsp;&nbsp;
                  <TextField
                    id="State"
                    name="State"
                    label="State"
                    value={this.state.adState}
                    onChange={this.handleChange("adState")}
                    placeholder="State"
                    margin="normal"
                    variant="outlined"
                    style={{ width: "7%" }}
                    required
                  />{" "}
                  &nbsp;&nbsp;&nbsp;
                  <TextField
                    id="zipcode"
                    name="zipcode"
                    label="Zip Code"
                    type="number"
                    value={this.state.zip}
                    onChange={this.handleChange("zip")}
                    placeholder="Zip Code"
                    margin="normal"
                    variant="outlined"
                    style={{ width: "24.6%" }}
                    required
                  />{" "}
                  <br />
                  <p style={{ paddingLeft: "6.5%" }}>
                    *Note: Your privacy is important to us. We will only contacy
                    you if there is an issue with your order.
                  </p>
                  <br />
                </Paper>
              </div>

              <h4 style={subhder}>2. DELIVERY METHOD</h4>
              <div
                style={{
                  margin: "0% 10% 2% 10%"
                }}
              >
                <Paper>
                  <p
                    style={{
                      paddingLeft: "6.5%",
                      paddingTop: "2%",
                      paddingBottom: "1%"
                    }}
                  >
                    {" "}
                    &nbsp;&nbsp;&nbsp;*Note: Depending on you order's total
                    weights and prices, our office will provide different
                    delivery method: <br /> <br />
                    1) If Grand Total is over $100 and Total weight is over 14
                    lbs : Free services by truck (2 business days) or $25
                    service fees by truck (same day) <br />
                    2) If Grand Total is over $100 and Total weight is less than
                    15 lbs : Free services by drone (same day during business
                    hours) <br />
                    3) If Grand Total is less than $100 and Total weight is over
                    14 lbs: $20 services fee by truck (2 business days) <br />
                    4) If Grand Total is less than $100 and Total weight is less
                    than 15 lbs: $20 services by drone (same day during business
                    hours) <br />
                  </p>
                  {/*This is for #1 from above*/}
                  <div style={{ paddingLeft: "6.5%", paddingBottom: "3%" }}>
                    <FormControl style={{ width: "30%" }}>
                      <InputLabel shrink htmlFor="delivery-label-placeholder">
                        Please select your delivery method:
                      </InputLabel>
                      <Select
                        input={
                          <Input
                            name="delivery"
                            id="delivery-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="dmethod"
                      >
                        <MenuItem value="">
                          <em>Please select...</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          Free services by truck (2 business days)
                        </MenuItem>
                        <MenuItem value={2}>
                          $25 service fees by truck (same day)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  {/*This is for #2 from above*/}
                  <div style={{ paddingLeft: "6.5%", paddingBottom: "3%" }}>
                    <FormControl style={{ width: "30%" }}>
                      <InputLabel shrink htmlFor="delivery-label-placeholder">
                        Please select your delivery method:
                      </InputLabel>
                      <Select
                        input={
                          <Input
                            name="delivery"
                            id="delivery-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="dmethod"
                      >
                        <MenuItem value="">
                          <em>Please select...</em>
                        </MenuItem>
                        <MenuItem value={1}>Free services by drone</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  {/*This is for #3 from above*/}
                  <div style={{ paddingLeft: "6.5%", paddingBottom: "3%" }}>
                    <FormControl style={{ width: "30%" }}>
                      <InputLabel shrink htmlFor="delivery-label-placeholder">
                        Please select your delivery method:
                      </InputLabel>
                      <Select
                        input={
                          <Input
                            name="delivery"
                            id="delivery-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="dmethod"
                      >
                        <MenuItem value="">
                          <em>Please select...</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          $20 services fee by truck (2 business days){" "}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  {/*This is for #4 from above*/}
                  <div style={{ paddingLeft: "6.5%", paddingBottom: "3%" }}>
                    <FormControl style={{ width: "30%" }}>
                      <InputLabel shrink htmlFor="delivery-label-placeholder">
                        Please select your delivery method:
                      </InputLabel>
                      <Select
                        input={
                          <Input
                            name="delivery"
                            id="delivery-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="dmethod"
                      >
                        <MenuItem value="">
                          <em>Please select...</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          $20 services by drone (same day during business hours)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Paper>
              </div>
              <h4 style={subhder}>3. PAYMENT</h4>
              <div
                style={{
                  margin: "0% 10% 2% 10%"
                }}
              >
                <Paper>
                  {/*
                  <img src={visa} alt="Visa" style={iconsize} />
                  <img src={master} alt="Master" style={iconsize} />
                  <img src={maestro} alt="Maestro" style={iconsize} />
                  <img src={discover} alt="Discover" style={iconsize} />
                  <img
                    src={americanexpress}
                    alt="AmericanExpress"
                    style={iconsize}
                  />{" "}
                  */}
                  <br />
                  <TextField
                    id="Card number"
                    label="Card number"
                    value={this.state.cardnumber}
                    onChange={this.handleChange("cardnumber")}
                    placeholder="Card number"
                    margin="normal"
                    variant="outlined"
                    style={{ width: "38%", marginLeft: "6.5%" }}
                    required
                  />{" "}
                  &nbsp;&nbsp;&nbsp;
                  <TextField
                    id="Expired Date"
                    label="MM/YY"
                    value={this.state.exdate}
                    onChange={this.handleChange("exdate")}
                    placeholder="Expired Date"
                    margin="normal"
                    variant="outlined"
                    style={{ width: "22.5%" }}
                    required
                  />{" "}
                  &nbsp;&nbsp;&nbsp;
                  <TextField
                    id="cvv"
                    label="XXX"
                    value={this.state.cvv}
                    onChange={this.handleChange("cvv")}
                    placeholder="CVV"
                    margin="normal"
                    variant="outlined"
                    style={{ width: "22.5%" }}
                    helperText="Last three digits on signature strip"
                    required
                  />{" "}
                  <br />
                </Paper>
              </div>

              <h4 style={subhder}>4. REVIEW ORDER</h4>
              <div style={table}>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ background: "#f5f5f5", color: "black" }}
                        >
                          ID
                        </TableCell>
                        <TableCell
                          style={{ background: "#f5f5f5", color: "black" }}
                        >
                          Item
                        </TableCell>

                        <TableCell
                          style={{ background: "#f5f5f5", color: "black" }}
                          align="right"
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          style={{ background: "#f5f5f5", color: "black" }}
                          align="right"
                        >
                          Weight
                        </TableCell>
                        <TableCell
                          style={{ background: "#f5f5f5", color: "black" }}
                          align="right"
                        >
                          Total
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.cart.map(item => {
                        const individualTotal = item.price * item.quantity;
                        subtotal += individualTotal;

                        return (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">
                              {item.weight * item.quantity} lbs
                            </TableCell>
                            <TableCell align="right">
                              ${individualTotal}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {/* Delete <br/><br/><br/><br/> after mapping for item -->*/}{" "}
                      <br />
                      <br />
                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={2}>Subtotal: ${subtotal}</TableCell>
                        <TableCell align="left" />
                      </TableRow>
                      <TableRow>
                        <TableCell>Shipping fee: ${shippingFee}</TableCell>
                        <TableCell align="left" />
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          Total: ${subtotal + shippingFee}
                        </TableCell>
                        <TableCell align="left" />
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </div>

              <br />
              <Button
                style={{ marginLeft: "45%", marginBottom: "1%" }}
                size="large"
                variant="contained"
                color="primary"
                id="buttons"
                type="submit"
                onClick={this.handlePlaceOrder}
              >
                Place Order
              </Button>
              <p style={{ textAlign: "center" }}>
                By clicking the Place Order button, you confirm that you have
                read and underestood, and accept our Terms and Conditions,
                Return Policy, and Privacy Policy.
              </p>
            </form>
          </div>
          {/* Order summary*/}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  cart: state.cart,
  authentication: state.authentication
});

export default connect(
  mapStateToProps,
  { getAllCartItemsFromDB, FinishLoadingFromDB, createOrder }
)(CheckOut);
