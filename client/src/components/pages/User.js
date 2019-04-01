import React, { Component } from "react";
import { connect } from "react-redux";
import { checkAuthentication } from "../../actions/authenticateActions";
import Searchbar from "../common/Searchbar";
import { withAuth } from "@okta/okta-react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
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
    return (
      <div>
        <h1>Welcome {this.state.name}</h1>
        <Searchbar />
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
