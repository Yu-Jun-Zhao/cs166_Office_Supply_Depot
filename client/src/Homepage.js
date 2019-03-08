import React, { Component } from "react";
import "./Homepage.css";
import Searchbar from './Searchbar'

class Homepage extends Component {
  render() {
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

export default Homepage
