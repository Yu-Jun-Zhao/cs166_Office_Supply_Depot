import React, { Component } from "react";
import "../../style/homepage.css";
import MenuBar from "../common/MenuBar";
//import Searchbar from "../common/Searchbar";

// For Guests
class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="menuBar">
          <MenuBar />
        </div>
      </div>
    );
  }
}

export default Homepage;
