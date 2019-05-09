import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeWarehouse, geocodeOrigin,
  getAllOrdersFromDB,
  retrieveShippingAddress
} from "../../actions/orderAction";
import MapContainer from "../common/MapContainer"
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Table,
  Button
} from "@material-ui/core/";

class OrderPage extends Component {

  componentDidMount() {
    this.props.getAllOrdersFromDB(this.props.authentication.userInfo.sub);
  }

  handleButtonChange = (shippingAddressId, fromAddressId) => event => {
    this.props.retrieveShippingAddress(shippingAddressId)
    this.props.changeWarehouse(fromAddressId)
  };

  render() {
    const { orders, warehouse } = this.props;
    // order_id, order_date, user_id, s_address_id,
    //         from_address_id, weight, price, status
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                Order ID
              </TableCell>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                Order Date
              </TableCell>

              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                Weight
              </TableCell>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders ? (
              orders.map(order => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.order_date.split("T")[0]}</TableCell>
                  <TableCell>{order.weight} lbs</TableCell>
                  <TableCell>${order.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={this.handleButtonChange(order.s_address_id, order.from_address_id)}
                    >
                      See Map
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div>LOADING</div>
            )}
          </TableBody>
        </Table>
        <MapContainer key={warehouse} zoom={4} origin={{lat:  37.312113, lng: -121.95431}} destination={warehouse}/>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  orders: state.orders.order,
  shippingAddress: state.orders.shippingAddress,
  loading: state.orders.loadingFromDB,
  warehouse: state.orders.warehouse
});

export default connect(
  mapStateToProps,
  { getAllOrdersFromDB, retrieveShippingAddress, changeWarehouse, geocodeOrigin }
)(OrderPage);
