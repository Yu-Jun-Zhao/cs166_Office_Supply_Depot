import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllOrdersFromDB } from "../../actions/orderAction";

class OrderPage extends Component {
  componentDidMount() {
    this.props.getAllOrdersFromDB("00uilj3svbiMLnQWQ356");
  }
  render() {
    const { orders } = this.props;
    // order_id, order_date, user_id, s_address_id,
    //         from_address_id, weight, price, status
    return (
      <React.Fragment>
        {orders ? (
          orders.map(order => (
            <React.Fragment>
              <div>{order.order_id}</div>
              <div>{order.order_date}</div>
            </React.Fragment>
          ))
        ) : (
          <div>LOADING</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  orders: state.orders.order,
  loading: state.orders.loadingFromDB
});

export default connect(
  mapStateToProps,
  { getAllOrdersFromDB }
)(OrderPage);
