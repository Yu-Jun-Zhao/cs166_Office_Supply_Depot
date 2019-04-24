import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import visa from './visa.jpg';
import master from './mastercard.png';
import maestro from './maestro.jpg';
import discover from './discover.png';
import americanexpress from './americanexpress.jpg';
import Grid from '@material-ui/core/Grid';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert('Order is placed' + this.state.value);
  }

  
  render() {

    
    const marg = {
      margin: "2% 10% 2% 33%"
    }

    const tField = {
      width: "60%"
    }

    const iconsize = {
      width: "7%",
      height: "7%"
    }

    return (
      <React.Fragment>
      <div>        
        
        <div>     
          
          <form style={marg} onSubmit={this.handleSubmit}>
            <div>
              <h4 >Your Information</h4>            
  
                <TextField 
                  id="firstname"
                  name="firstname"
                  label = "First name"              
                  value={this.state.firstname}
                  onChange={this.handleChange('firstname')}
                  placeholder="First Name"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                  autoComplete="fname"
                /> <br/>
                <TextField
                  id="lastname"
                  name="lastname"
                  label="Last name"               
                  value={this.state.lastname}
                  onChange={this.handleChange('lastname')}
                  placeholder="Last Name"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                  /> <br/>
                        
                
                <TextField
                  id="email"
                  name="email"
                  label="Email"              
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  placeholder="Email"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                /> <br/>
                
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone number"              
                  value={this.state.phone}
                  onChange={this.handleChange('phone')}
                  placeholder="Phone number"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                /> <br/>
              
                <h4>Shipping Address</h4>
                <TextField
                  id="street"
                  name="stree"
                  label="Street"              
                  value={this.state.street}
                  onChange={this.handleChange('street')}
                  placeholder="Street"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                /> <br/>

              

                <TextField
                  id="city"
                  name="city"
                  label="City"              
                  value={this.state.city}
                  onChange={this.handleChange('city')}
                  placeholder="City"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                /> <br/>

                <TextField
                  id="State"
                  name="State"
                  label="State"           
                  value={this.state.state}
                  onChange={this.handleChange('state')}
                  placeholder="State"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                /> <br/>
                  

                  <TextField
                  id="zipcode"
                  name="zipcode"
                  label="Zipcode"          
                  value={this.state.zipcode}
                  onChange={this.handleChange('zipcode')}
                  placeholder="Zip code"
                  margin="normal"
                  variant="outlined" 
                  style={tField} 
                  required                
                /> <br/>

                

              <h4>Billing Address</h4>
              <TextField
                  id="Billing street"
                  name="bstreet"
                  label="Billing street"             
                  value={this.state.bstreet}
                  onChange={this.handleChange('bstreet')}
                  placeholder="Street"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                /> <br/>

              

                <TextField
                  id="Billing city"
                  name="bcity"
                  label="Billing city"              
                  value={this.state.bcity}
                  onChange={this.handleChange('bcity')}
                  placeholder="City"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                /> <br/>

                <TextField
                  id="Billing State"
                  name="bstate"
                  label="Billing State"        
                  value={this.state.bstate}
                  onChange={this.handleChange('bstate')}
                  placeholder="State"
                  margin="normal"
                  variant="outlined"
                  style={tField}
                  required
                /> <br/>
                  

                  <TextField
                  id="Billing zipcode" 
                  name="bzipcode"
                  label="Billing zipcode"                                       
                  value={this.state.bzipcode}
                  onChange={this.handleChange('bzipcode')}
                  placeholder="Zip code"
                  margin="normal"
                  variant="outlined"       
                  style={tField}  
                  required         
                /> <br/>

              <h4>Payment details</h4>
              <img src={visa} alt="Visa" style={iconsize}/>
              <img src={master} alt="Master" style={iconsize}/>
              <img src={maestro} alt="Maestro" style={iconsize}/>
              <img src={discover} alt="Discover" style={iconsize}/>
              <img src={americanexpress} alt="AmericanExpress" style={iconsize}/> <br/>

              <TextField
                  id="Card number" 
                  label="Card number"                               
                  value={this.state.cardnumber}
                  onChange={this.handleChange('cardnumber')}
                  placeholder="Card number"
                  margin="normal"
                  variant="outlined"    
                  style={tField}  
                  required   
               /> <br/>

               <TextField
                  id="Expired Month"     
                  label="Expired Month"                           
                  value={this.state.exmonth}
                  onChange={this.handleChange('exmonth')}
                  placeholder="Expired Month"
                  margin="normal"
                  variant="outlined" 
                  style={tField}  
                  required     
               /> <br/>

                <TextField
                  id="Expired Year"     
                  label="Expired Year"                           
                  value={this.state.exyear}
                  onChange={this.handleChange('exyear')}
                  placeholder="Expired Year"
                  margin="normal"
                  variant="outlined"   
                  style={tField}  
                  required    
               /> <br/>

                <TextField
                  id="cvv"     
                  label="CVV"                           
                  value={this.state.cvv}
                  onChange={this.handleChange('cvv')}
                  placeholder="CVV"
                  margin="normal"
                  variant="outlined"   
                  style={tField} 
                  helperText="Last three digits on signature strip"
                  required
               /> <br/>  
               
                       
            </div> <br/>
            <Button style={{marginLeft:"22.5%"}} size="large" variant="contained" color="primary" id="buttons" type="submit">
              Place Order
            </Button>
        </form>
        
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
