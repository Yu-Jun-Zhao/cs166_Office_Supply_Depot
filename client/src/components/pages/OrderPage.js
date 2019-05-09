import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeOrderId,
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

  handleButtonChange = (shippingAddressId, fromAddressId, orderId) => event => {
    this.props.retrieveShippingAddress(shippingAddressId)
    this.props.changeOrderId(orderId)
    this.props.changeWarehouse(fromAddressId)
    const { shippingAddress } = this.props
    this.props.geocodeOrigin(`${shippingAddress.address} ${shippingAddress.city} ${shippingAddress.state} ${shippingAddress.zip}`);
  };

  render() {
    const { origin, orders, warehouse, order_id } = this.props;
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
                      onClick={this.handleButtonChange(order.s_address_id, order.from_address_id, order.order_id)}
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
        <MapContainer key={order_id} zoom={4} origin={origin} destination={warehouse}/>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  orders: state.orders.order,
  shippingAddress: state.orders.shippingAddress,
  loading: state.orders.loadingFromDB,
  warehouse: state.orders.warehouse,
  origin: state.orders.origin,
  order_id: state.orders.order_id
});

export default connect(
  mapStateToProps,
  { getAllOrdersFromDB, retrieveShippingAddress, changeWarehouse, geocodeOrigin, changeOrderId }
)(OrderPage);
