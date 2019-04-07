import React, { Component } from "react";
import "../../style/homepage.css";
import MenuBar from "../common/MenuBar";
//import Searchbar from "../common/Searchbar";
import StepperPanel from "../common/StepperPanel";

// For Guests
class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="menuBar">
          <MenuBar />
        </div>
        <StepperPanel />
      </div>
    );
  }
}

export default Homepage;
