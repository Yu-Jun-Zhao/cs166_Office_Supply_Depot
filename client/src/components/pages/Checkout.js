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

const from_address = 1; // since we only support one starting point of delivery.

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      loadingFromDB: false,
      address: null,
      city: null,
      adState: null,
      zip: null,
      delivery_method: 0,
      delivery_time_limit: 2,
      subtotal: 0,
      shippingFee: 0,
      weight: 0
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
        loadingFromDB: nextProps.cart.loadingFromDB,
        subtotal:
          nextProps.cart.cart.length !== 0
            ? nextProps.cart.cart
                .map(item => item.price * item.quantity)
                .reduce((a, c) => a + c)
            : 0,
        weight:
          nextProps.cart.cart.length !== 0
            ? nextProps.cart.cart
                .map(item => item.weight * item.quantity)
                .reduce((a, c) => a + c)
            : 0
      };
    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDeliveryChange = name => event => {
    // not pick up.
    if (name === "delivery_method") {
      if (event.target.value !== 0) {
        let delivery_time_limit = 2;
        let delivery_method = 0;
        if (this.state.weight < 15) {
          //drone
          delivery_method = 1;
          delivery_time_limit = 1;
        } else {
          //truck
          delivery_method = 2;
          delivery_time_limit = 2;
        }
        this.setState({ delivery_method, delivery_time_limit });
      } else if (event.target.value === 0) {
        // pick up
        this.setState({ delivery_method: 0, shippingFee: 0 });
      }
    }

    // less than $100 and not pick up

    if (name === "delivery_time_limit" && this.state.delivery_method !== 0) {
      let shippingFee = 0;
      if (
        this.state.subtotal >= 100 &&
        event.target.value === 1 &&
        this.state.delivery_method === 2
      ) {
        shippingFee = 25;
      } else if (this.state.subtotal < 100) {
        shippingFee = 20;
      }
      this.setState({ delivery_time_limit: event.target.value, shippingFee });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      address,
      city,
      adState,
      zip,
      delivery_method,
      delivery_time_limit
    } = this.state;
    if (address !== null && city !== null && adState !== null && zip !== null) {
      this.props.createOrder(
        this.props.authentication.userInfo.sub,
        address,
        city,
        adState,
        zip,
        0,
        delivery_method,
        delivery_time_limit
      );
      window.location.href = "/orders";
      localStorage.removeItem('cart')
    }
  };

  render() {
    /*
    const iconsize = {
      width: "5%",
      height: "5%",
      marginLeft: "6.5%"
    };
*/
    const { delivery_method, delivery_time_limit } = this.state;
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

    let subtotal = 0;
    let shippingFee = 0;
    let weight = 0;

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
                    *Note: Your privacy is important to us. We will only contact
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
                    &nbsp;&nbsp;&nbsp;*Note the pickup location: 1 Washington
                    Sq, San Jose, CA 95192
                    <br />
                  </p>
                  <div style={{ paddingLeft: "6.5%", paddingBottom: "3%" }}>
                    <FormControl style={{ width: "30%" }}>
                      <InputLabel shrink htmlFor="delivery-method">
                        Pickup or Delivery?
                      </InputLabel>
                      <Select
                        value={delivery_method}
                        onChange={this.handleDeliveryChange("delivery_method")}
                      >
                        <MenuItem value={0}>Pickup</MenuItem>

                        <MenuItem value={delivery_method === 1 ? 1 : 2}>
                          Delivery
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  {delivery_method !== 0 && (
                    <div>
                      <p
                        style={{
                          paddingLeft: "6.5%",

                          paddingBottom: "1%"
                        }}
                      >
                        {" "}
                        &nbsp;&nbsp;&nbsp;*Note: Depending on you order's total
                        weights and prices, our office will provide different
                        delivery method: <br /> <br />
                        1) Orders that are less than 15 lbs are delivered by a
                        drone. Order that are 15 lbs or more are delivered by a
                        truck.
                        <br />
                        2) If Grand Total is $100 or more, we offer free
                        delivery service. If Grand Total is less than $100,
                        there will be a surcharge of $20.
                        <br />
                        3) Drone delivery: Same day. Truck delivery: 2 days or 1
                        day (with a surchage of 25).
                        <br />
                      </p>
                      <div style={{ paddingLeft: "6.5%", paddingBottom: "3%" }}>
                        <FormControl style={{ width: "30%" }}>
                          <InputLabel
                            shrink
                            htmlFor="delivery-label-placeholder"
                          >
                            {`Orders Will be delivered by ${
                              this.state.weight < 15 ? "drone" : "truck"
                            } in:`}
                          </InputLabel>
                          <Select
                            value={delivery_time_limit}
                            onChange={this.handleDeliveryChange(
                              "delivery_time_limit"
                            )}
                          >
                            {(this.state.subtotal >= 100 ||
                              this.state.delivery_method === 1) && (
                              <MenuItem value={1}>
                                One Day{" "}
                                {this.state.delivery_method === 2 ? "$25" : ""}
                              </MenuItem>
                            )}

                            {this.state.weight >= 15 && (
                              <MenuItem value={2}>
                                Two Day{" "}
                                {this.state.subtotal >= 100 ? "(FREE)" : ""}
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  )}
                </Paper>
              </div>

              <h4 style={subhder}>3. REVIEW ORDER</h4>
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
                        <TableCell colSpan={2}>
                          Subtotal: ${this.state.subtotal}
                        </TableCell>
                        <TableCell align="left" />
                      </TableRow>
                      <TableRow>
                        <TableCell>Weight: {this.state.weight}lbs</TableCell>
                        <TableCell align="left" />
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          Shipping fee: ${this.state.shippingFee}
                        </TableCell>
                        <TableCell align="left" />
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          Total: ${this.state.subtotal + this.state.shippingFee}
                        </TableCell>
                        <TableCell align="left" />
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </div>
              <h4 style={subhder}>4. PAYMENT</h4>
              <div
                style={{
                  margin: "0% 10% 2% 10%"
                }}
              >
                <Paper>
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
