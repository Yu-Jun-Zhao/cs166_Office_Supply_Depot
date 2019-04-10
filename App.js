import React, { Component } from 'react';
import ItemHolder from "../common/Product";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Shoppingcart   extends Component{
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

    /* construct a boolean to make a condition to decide the delivery method
      this.state = { over100dollar: false; over15lbs: false}
    */  

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert("Added" + this.state.value);
  }
  /* printSomething = () => {
    code here } */
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
				        <td>Office Chair</td>
				        <td>$25.00</td>
				        <td><input type="number" value="3" min="1">
                    </input></td>
				        <td><button>Remove</button></td>
				        <td>$75.00</td>
			        </tr>
            </tbody>
          </table >
        </div>
      </div>

      <div>
          <h2>About Delivery Services</h2>
          <p>We offer a free delivery services for any the order that over $100.00 <br/>  
          For any order that are less than 15 lbs, the delevery will be done by a drone on the same day during business hours. <br/> 
          For any order that equal or heavier than 15 lbs, the orders will be delivered by delivery truck within 2 business days. <br/>
          For any order that are under $100, customer can request deliveries (drone or truck) by paying a surcharge of $20. <br/>
          For same day truck delivery of orders over $100, customer can pay a surcharge of $25.  
          </p>

          <div>
            {/* This will construct an if else function to decide the delivery method for 
            customer based on the order's subtotal and weight and the print out the option for the customer to see */
            
            
            }
          </div>
      </div>

          {/* This is for demo only. The if else in the render will print out something like this */}
      <div> 
          Based on the grand total and the weight of your order. Your delivery method will be: <br/>
          Delivery truck within 2 business days: $20.
      </div>

      <div>        
		    <h2>Order Summary</h2>
		    <div>
		      <div>
			       <div >
              <label>Subtotal</label>
			            <div>75.00</div> &emsp;&emsp;&emsp;&emsp;
			             </div>
			             <div>
			                <label>Tax (5%)</label>
			                   <div  >3.75</div>
                         &emsp;&emsp;&emsp;&emsp;
			              </div>
                    <div> 
                      <label>Shipping Fee</label>
                        <div>$20</div> 
                    </div>
			              <div>
			                 <label>Grand Total</label>
			                    <div >98.75</div> <br />
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