import React, { Component } from "react";
import "./Homepage.css";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    // something here
    alert("submitted: " + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="navigation">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Search..."
          />
          <button id="buttons" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

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

export default Homepage;
