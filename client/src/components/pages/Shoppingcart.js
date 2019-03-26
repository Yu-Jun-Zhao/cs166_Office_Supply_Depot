import React, { Component } from 'react';

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
    const { productID, pName, price, weight, quantity } = this.props;
    return (
      <div className='Shoppingcart'>
        <div>
          <h1>Shopping Cart</h1>
        </div>
        <div>
          <table >
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
              <th>Total</th>
              </tr>
              <tr>
                <td>
					           <div>
                        <h3> image</h3>
					           </div>
				         </td>

				         <td>
					            <div >
						                <div >Carrot</div>
					            </div>
				         </td>

				         <td>
				             <div >2.99</div>
				         </td>

				         <td>
					            <input type="number" value="6" min="1">
                      </input>
				         </td>

				         <td>
					            <button>Remove
                      </button>
				         </td>

				         <td>
					            <div >17.88</div>
				         </td>
			        </tr>
            </table >
          </div>
          <div>
		        <h2>Order Summary</h2>
		        <div>
		           <div>
			            <div >
			               <label>Subtotal</label>
			                  <div>17.88</div> &emsp;&emsp;&emsp;&emsp;
			             </div>
			             <div >
			                <label>Tax (5%)</label>
			                   <div  >1.60</div>
                         &emsp;&emsp;&emsp;&emsp;
			              </div>
			              <div>
			                 <label>Grand Total</label>
			                    <div >19.38</div> <br />
                    </div>
		            </div>
			          <div>
			             <button>Checkout</button>
			          </div>
		        </div>
	      </div>

      </div>
  );
}
}
export default Shoppingcart;
