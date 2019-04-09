import React, { Component } from "react";
import { connect } from "react-redux";
import { checkAuthentication } from "../../actions/authenticateActions";
import Homepage from "../pages/Homepage";
import { withAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";

// For displaying recent purchases

// For now
// The rendered state is used for redirecting to '/'
// The login will first route to this page to check authentication

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: props.authentication.isAuthenticated,
      name: ""
    };
  }

  componentDidMount() {
    this.props.checkAuthentication(
      this.props.auth,
      this.props.authentication.isAuthenticated,
      this.props.authentication.userInfo
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.authentication.isAuthenticated) {
      return {
        isAuthenticated: true,
        name: nextProps.authentication.userInfo.name
      };
    }
    return {
      isAuthenticated: false,
      name: ""
    };
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Welcome {this.state.name} To User Page</h1>
        <h1>Working in progress</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(
  mapStateToProps,
  { checkAuthentication }
)(withAuth(User));
