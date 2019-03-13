import React, { Component } from "react";
import "./App.css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Order is placed" + this.state.value);
  }

  render() {
    return (
      <div className="App">
        <div>
          <h3>Order Summary</h3>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h3 className="header">Your Information</h3>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={this.state.firstname}
                onChange={this.handleChange}
                autoFocus
              />
              &nbsp;
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="textbox"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="textbox"
                value={this.state.phone}
                onChange={this.handleChange}
                maxLength="10"
              />
              <h3>Shipping Address</h3>
              <input
                type="text"
                name="Street"
                placeholder="Street"
                className="textbox"
                value={this.state.Street}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="Unit"
                placeholder="Apt, Unit"
                className="textbox"
                value={this.state.Unit}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="City"
                placeholder="City"
                className="textbox2"
                value={this.state.City}
                onChange={this.handleChange}
              />
              &nbsp;
              <input
                type="text"
                name="State"
                placeholder="State"
                className="textbox4"
                value={this.state.State}
                onChange={this.handleChange}
              />
              &nbsp;
              <input
                type="text"
                name="zipcode"
                placeholder="Zip code"
                className="textbox3"
                maxLength="5"
                minLength="5"
                value={this.state.zipcode}
                onChange={this.handleChange}
              />
              <br />
              <h3>Billing Address</h3>
              <input
                type="text"
                name="billStreet"
                placeholder="Street"
                className="textbox"
                value={this.state.billStreet}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="billUnit"
                placeholder="Apt, Unit"
                className="textbox"
                value={this.state.billUnit}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="billCity"
                placeholder="City"
                className="textbox2"
                value={this.state.billCity}
                onChange={this.handleChange}
              />
              &nbsp;
              <input
                type="text"
                name="billState"
                placeholder="State"
                className="textbox4"
                value={this.state.billState}
                onChange={this.handleChange}
              />
              &nbsp;
              <input
                type="text"
                name="billzipcode"
                placeholder="Zip code"
                className="textbox3"
                maxLength="5"
                minLength="5"
                value={this.state.billzipcode}
                onChange={this.handleChange}
              />
              <br />
              <h3>Credit Card Information</h3>
              <img src="./media/visa.jpg" alt="Visa" className="iconsize" />
              <img
                src="./media/mastercard.png"
                alt="Master"
                className="iconsize"
              />
              <img
                src="./media/maestro.jpg"
                alt="Maestro"
                className="iconsize"
              />
              <img
                src="./media/discover.png"
                alt="Discover"
                className="iconsize"
              />
              <img
                src="./media/americanexpress.jpg"
                alt="AmericanExpress"
                className="iconsize"
              />{" "}
              <br />
              <input
                type="text"
                name="cardnumber"
                placeholder="Card Number"
                className="textbox"
                maxLength="16"
                minLength="16"
                value={this.state.cardnumber}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="expmonth"
                placeholder="Expired Month"
                maxLength="2"
                minLength="2"
                value={this.state.expmonth}
                onChange={this.handleChange}
              />
              &nbsp;
              <input
                type="text"
                name="expyear"
                placeholder="Expired Year"
                maxLength="2"
                minLength="2"
                value={this.state.expyear}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                className="textbox"
                maxLength="3"
                minLength="3"
                value={this.state.cvv}
                onChange={this.handleChange}
              />{" "}
              &nbsp;
            </div>{" "}
            <br />
            <button id="buttons" type="submit">
              Place Order{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Checkout;
