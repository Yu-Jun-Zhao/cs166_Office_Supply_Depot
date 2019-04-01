import React, { Component } from "react";
import "../../style/homepage.css";
import Searchbar from "../common/Searchbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// For Guests
class Homepage extends Component {
  state = {
    isAuthenticated: this.props.authentication
  };
  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/user" />;
    }
    return (
      <div>
        <span className="homepage" />
        <h1> Office Supply Depot (OSD)</h1>
        <div className="searchbar">
          {" "}
          <Searchbar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(Homepage);
