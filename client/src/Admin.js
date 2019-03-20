import React, { Component } from "react";
import Searchbar from "./components/common/Searchbar";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.setState({
      email: "",
      name: ""
    });
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <Searchbar />
      </div>
    );
  }
}

export default Admin;
