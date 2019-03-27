import React, { Component } from "react";
import { connect } from "react-redux";

//import ReactPaginate from "react-paginate";
// Mainly for Admin

class ItemAdder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s8">
                <input type="text" className="validate" id="new_item_text" />
                <label htmlFor="new_item_text">New Item</label>
              </div>

              <div className="input-field col s1">
                <input
                  type="number"
                  className="validate"
                  id="new_item_weight"
                />
                <label htmlFor="new_item_weight">weight</label>
              </div>

              <div className="input-field col s1">
                <input type="number" className="validate" id="new_item_price" />
                <label htmlFor="new_item_price">Price</label>
              </div>

              <div className="input-field col s1">
                <input
                  type="number"
                  className="validate"
                  id="new_item_quantity"
                />
                <label htmlFor="new_item_quantity">Quantity</label>
              </div>
              <div className="col s1">
                <a className="btn-floating btn-large waves-effect waves-light light-blue accent-1">
                  <i className="material-icons">add</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ItemAdder);
