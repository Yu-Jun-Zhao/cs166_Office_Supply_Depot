import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';

const Title = props => <div>{props.children}</div>

class Itemholder extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value });
  }
  render() {
    //this.setState(())
    const { products } = this.props
    return(
      <div class="row">
  <div class="col s12 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Item</span>
        <p>Description</p>
        <p>Price</p>
      </div>
      <div class="card-action">
        <a href="#">Expand</a>
      </div>
    </div>
  </div>
</div>
    );
  }
}
export default Itemholder;
