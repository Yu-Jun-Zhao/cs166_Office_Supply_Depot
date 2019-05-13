import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeOrderId,
  changeWarehouse,
  generateMap,
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

  state = {
    eta: null
  }

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

  handleButtonChange = (shippingAddressId, fromAddressId, orderId, delivery_method) => event => {
    this.props.generateMap(shippingAddressId, fromAddressId, orderId, delivery_method);
    this.setState({eta: true})
  };

  render() {
    const { origin, orders, warehouse, order_id } = this.props;

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
                Total
              </TableCell>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                Delivery Method
              </TableCell>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                Status
              </TableCell>
              <TableCell style={{ background: "#f5f5f5", color: "black" }}>
                MAP & ETA
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
                  <TableCell>${order.total}</TableCell>

                  <TableCell>
                    {
                      order.delivery_method === 0 ? 'Pickup' :
                          order.delivery_method === 1 ? 'Drone' : 'Truck'
                    }

                  </TableCell>
                  <TableCell>
                    {order.status === 0 ? "In progress" : "Delivered"}
                  </TableCell>
                  <TableCell>
                    {
                      order.delivery_method === 0 ? 'N/A' :
                      <Button
                          variant="outlined"
                          onClick={this.handleButtonChange(
                              order.s_address_id,
                              0,
                              order.order_id,
                              order.delivery_method
                          )}
                      >
                        View
                      </Button>
                    }
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
        <div>
          {
            this.state.eta && this.props.eta ? 'ETA: ' + this.props.eta : ''
          }
        </div>
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
  order_id: state.orders.order_id,
  eta: state.orders.eta
});

export default connect(
  mapStateToProps,
  {
    getAllOrdersFromDB,
    retrieveShippingAddress,
    changeWarehouse,
    changeOrderId,
    generateMap
  }
)(OrderPage);
