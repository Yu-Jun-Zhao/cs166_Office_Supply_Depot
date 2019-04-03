import React, { Component } from "react";
import "../../style/homepage.css";
import Searchbar from "../common/Searchbar";
import StepperPanel from "../common/StepperPanel";

// For Guests
class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <Searchbar />
        <StepperPanel />
      </div>
    );
  }
}

export default Homepage;
