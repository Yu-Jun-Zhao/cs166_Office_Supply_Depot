import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeOrderId,
  changeWarehouse,
  generateMap,
  geocodeOrigin,
  getAllOrdersFromDB,
  retrieveShippingAddress
} from "../../actions/orderAction";
import MapContainer from "../common/MapContainer";
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
    if (this.props.authentication.cartId !== null) {
      console.log(this.props.authentication.cartId);
      this.props.getAllOrdersFromDB(this.props.authentication.userInfo.sub);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authentication.cartId !== prevProps.authentication.cartId) {
      this.props.getAllOrdersFromDB(this.props.authentication.userInfo.sub);
    }
  }

  handleButtonChange = (shippingAddressId, fromAddressId, orderId) => event => {
    this.props.generateMap(shippingAddressId, fromAddressId, orderId);
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
                Delivery Fee
              </TableCell>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                Total
              </TableCell>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                See Map
              </TableCell>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                Status
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
                  <TableCell>{order.surcharge}</TableCell>
                  <TableCell>${order.total}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={this.handleButtonChange(
                        order.s_address_id,
                        order.from_address_id,
                        order.order_id
                      )}
                    >
                      See Map
                    </Button>
                  </TableCell>
                  <TableCell>
                    {order.status === 0 ? "In progress" : "Delivered"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div>LOADING</div>
            )}
          </TableBody>
        </Table>
        <MapContainer
          key={order_id}
          zoom={4}
          origin={origin}
          destination={warehouse}
        />
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
  {
    getAllOrdersFromDB,
    retrieveShippingAddress,
    changeWarehouse,
    geocodeOrigin,
    changeOrderId,
    generateMap
  }
)(OrderPage);
