import React, { Component } from "react";
import { connect } from "react-redux";
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

  componentDidMount() {}

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
)(OrderPage);
