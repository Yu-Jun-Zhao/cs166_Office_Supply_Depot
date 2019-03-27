import React, { Component } from 'react';
import ItemHolder from "../common/Product";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Shoppingcart extends Component{
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
    alert("Added" + this.state.value);
  }

  render() {
    const { products, total } = this.props;
    return (
      <React.Fragment>
        <ul>
          {products.map(product => {
            return (
              <div key={product.productID}>
                <ItemHolder product={product} />
              </div>
            );
          })}
        </ul>
      <div className='Shoppingcart'>
          <h1>Shopping Cart</h1>
        <div>
          <table >
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
              <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><h3> image</h3></td>
				        <td>Carrot</td>
				        <td>8</td>
				        <td><input type="number" value="4" min="1">
                    </input></td>
				        <td><button>Remove</button></td>
				        <td>32.00</td>
			        </tr>
            </tbody>
          </table >
        </div>
      </div>
      <div>
		    <h2>Order Summary</h2>
		    <div>
		      <div>
			       <div >
              <label>Subtotal</label>
			            <div>32.00</div> &emsp;&emsp;&emsp;&emsp;
			             </div>
			             <div>
			                <label>Tax (5%)</label>
			                   <div  >1.60</div>
                         &emsp;&emsp;&emsp;&emsp;
			              </div>
			              <div>
			                 <label>Grand Total</label>
			                    <div >33.60</div> <br />
                    </div>
		              </div>
			            <div><button>Checkout</button></div>
		           </div>
	          </div>
    </React.Fragment>
  );
}
}
const mapStateToProps = state => ({
  products: state.products.items,
  total: state.products.total
});
export default withRouter(connect(mapStateToProps)(Shoppingcart));
