import React, { Component } from "react";
import Searchbar from "../common/Searchbar";
import { connect } from "react-redux";
import { withAuth } from "@okta/okta-react";
import { checkAuthentication } from "../../actions/authenticateActions";
import TableItemsList from "../common/TableItemsList";
import ItemAdder from "../common/ItemAdder";
import ItemUpdater from "../common/ItemUpdater";


class Admin extends Component {
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
        <h1>Admin</h1>
        <ItemAdder />
        <ItemUpdater/>
        <TableItemsList isAuthenticated={this.state.isAuthenticated} />
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
)(withAuth(Admin));
