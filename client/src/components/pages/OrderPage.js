import React, { Component } from "react";
import { connect } from "react-redux";
<<<<<<< HEAD
import { getAllOrdersFromDB } from "../../actions/orderAction";

class OrderPage extends Component {

    componentDidMount() {
        this.props.getAllOrdersFromDB('00uilj3svbiMLnQWQ356')
    }
    render() {
        const { orders } = this.props
        // order_id, order_date, user_id, s_address_id,
        //         from_address_id, weight, price, status
        return (
            <React.Fragment>
                {
                    orders ? orders.map(order =>
                            <React.Fragment>
                                <div>
                                    {order.order_id}
                                </div>
                                <div>
                                    {order.order_date}
                                </div>
                    </React.Fragment>) :
                        <div>LOADING</div>
                }
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
    mapStateToProps, { getAllOrdersFromDB }
=======
import { withAuth } from "@okta/okta-react";
//import { checkAuthentication } from "../../actions/authenticateActions";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      name: ""
    };
  }

  componentDidMount() {
    console.log(this.props.authentication.userInfo.sub);
  }

  render() {
    return (
      <React.Fragment>
        <h1> TST </h1>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(
  mapStateToProps,
  {}
>>>>>>> e69353faca1f44b58a755aec105359578605e6f3
)(OrderPage);
