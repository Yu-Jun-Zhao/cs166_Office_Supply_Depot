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
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';


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

    const iconsize = {
      width: "5%",
      height: "5%",
      marginLeft:"6.5%"
    }

    const hder = {
      padding: "0.5% 0% 0% 45%"
    }

    const subhder = {
      background: "black",
      margin: "2% 10% 0% 10%",
      paddingLeft:"30px",
      paddingTop:"10px",
      height:"50px",
      color:"white"
    }

    const table = {
      margin: "0% 10% 0% 10%",
    }
    
    return (
      <React.Fragment>
      <div style={{alignItems:"flex-inline"}}>

      <div><h2 style={hder}>CHECKOUT</h2></div>  
        <div>        
             
          
          <form  onSubmit={this.handleSubmit}>
          
          <h4 style={subhder}>1. SHIPPING</h4>  
          
            <div style={
                {
                border: '2px solid #f5f5f5',
                margin: "0% 10% 2% 10%"             
                
                }
              }>
                <Paper>      
                <TextField 
                  id="firstname"
                  name="firstname"
                  label = "First name"              
                  value={this.state.firstname}
                  onChange={this.handleChange('firstname')}
                  placeholder="First Name"
                  margin="normal"
                  variant="outlined"
                  required
                  style = {{width:'42%',marginLeft:"6.5%"}}
                /> &nbsp;&nbsp;&nbsp;
                <TextField
                  id="lastname"
                  name="lastname"
                  label="Last name"               
                  value={this.state.lastname}
                  onChange={this.handleChange('lastname')}
                  placeholder="Last Name"
                  margin="normal"
                  variant="outlined"
                  
                  required
                  style = {{width:'42%',marginLeft:"1%"}}
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
                  
                  required
                  style = {{width:'42%',marginLeft:"6.5%"}}
                /> &nbsp;&nbsp;&nbsp;
                
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone number"              
                  value={this.state.phone}
                  onChange={this.handleChange('phone')}
                  placeholder="Phone number"
                  margin="normal"
                  variant="outlined"
                 
                  required
                  style = {{width:'42%',marginLeft:"1%"}}
                /> <br/>

                 
              
                
                <TextField
                  id="street"
                  name="street"
                  label="Street"              
                  value={this.state.street}
                  onChange={this.handleChange('street')}
                  placeholder="Street"
                  margin="normal"
                  variant="outlined"                 
                  required
                  style = {{width:'86.5%',marginLeft:"6.5%"}}
                /> &nbsp;&nbsp;&nbsp;

                <TextField
                  id="city"
                  name="city"
                  label="City"              
                  value={this.state.city}
                  onChange={this.handleChange('city')}
                  placeholder="City"
                  margin="normal"
                  variant="outlined"
                  style = {{width:'29.2%',marginLeft:"6.5%"}}
                  required                 
                /> &nbsp;&nbsp;&nbsp;

                <TextField
                  id="State"
                  name="State"
                  label="State"           
                  value={this.state.state}
                  onChange={this.handleChange('state')}
                  placeholder="State"
                  margin="normal"
                  variant="outlined"
                  style = {{width:'29.5%'}}
                  required
                /> &nbsp;&nbsp;&nbsp;
                  

                  <TextField
                  id="zipcode"
                  name="zipcode"
                  label="Zip Code"          
                  value={this.state.zipcode}
                  onChange={this.handleChange('zipcode')}
                  placeholder="Zip Code"
                  margin="normal"
                  variant="outlined" 
                  style = {{width:'24.6%'}}
                  required                
                /> <br/>
                <p style={{paddingLeft:"6.5%"}}>*Note: Your privacy is important to us. We will only contacy you if there is an issue with your order.</p><br/>
               </Paper>
                  </div>





             <h4 style={subhder}>2. DELIVERY METHOD</h4>
                <div style={
                {
                border: '1px solid #f5f5f5',
                margin: "0% 10% 2% 10%"
                }
              }>
              <Paper>
                <p style={{paddingLeft:"6.5%", paddingTop:"2%", paddingBottom:"1%"}}> &nbsp;&nbsp;&nbsp;*Note: Depending on you order's total weights and prices, our office will provide
                different delivery method: <br/> <br/>
               1) If Grand Total is over $100 and Total weight is over 14 lbs : Free services by truck (2 business days) or $25 service fees by truck (same day) <br/>
               2) If Grand Total is over $100 and Total weight is less than 15 lbs : Free services by drone (same day during business hours) <br/>
               3) If Grand Total is less than $100 and Total weight is over 14 lbs: $20 services fee by truck (2 business days) <br/>
               4) If Grand Total is less than $100 and Total weight is less than 15 lbs: $20 services by drone (same day during business hours) <br/>
                </p>

              {/*This is for #1 from above*/}
                <div style={{paddingLeft:"6.5%", paddingBottom:"3%"}}>
                  <FormControl style={{width:"30%"}}>
                    <InputLabel shrink htmlFor="delivery-label-placeholder">
                    Please select your delivery method:
                    </InputLabel>
                    <Select                      
                      input={<Input name="delivery" id="delivery-label-placeholder" />}
                      displayEmpty
                      name="dmethod"    
                    >
                      <MenuItem value="">
                        <em>Please select...</em>
                      </MenuItem>
                      <MenuItem value={1}>Free services by truck (2 business days)</MenuItem>
                      <MenuItem value={2}>$25 service fees by truck (same day)</MenuItem>
                      
                    </Select>
                  </FormControl>
                </div>

                 {/*This is for #2 from above*/}
                 <div style={{paddingLeft:"6.5%", paddingBottom:"3%"}}>
                    <FormControl style={{width:"30%"}}>
                      <InputLabel shrink htmlFor="delivery-label-placeholder">
                      Please select your delivery method:
                      </InputLabel>
                      <Select                      
                        input={<Input name="delivery" id="delivery-label-placeholder" />}
                        displayEmpty
                        name="dmethod"    
                      >
                        <MenuItem value="">
                          <em>Please select...</em>
                        </MenuItem>
                        <MenuItem value={1}>Free services by drone</MenuItem>                     
                        
                      </Select>
                    </FormControl>
                  </div>

                  {/*This is for #3 from above*/}
                 <div style={{paddingLeft:"6.5%", paddingBottom:"3%"}}>
                  <FormControl style={{width:"30%"}}>
                    <InputLabel shrink htmlFor="delivery-label-placeholder">
                    Please select your delivery method:
                    </InputLabel>
                    <Select                      
                      input={<Input name="delivery" id="delivery-label-placeholder" />}
                      displayEmpty
                      name="dmethod"    
                    >
                      <MenuItem value="">
                        <em>Please select...</em>
                      </MenuItem>
                      <MenuItem value={1}>$20 services fee by truck (2 business days) </MenuItem>                     
                      
                    </Select>
                  </FormControl>
                </div>

                {/*This is for #4 from above*/}
                <div style={{paddingLeft:"6.5%", paddingBottom:"3%"}}>
                  <FormControl style={{width:"30%"}}>
                    <InputLabel shrink htmlFor="delivery-label-placeholder">
                    Please select your delivery method:
                    </InputLabel>
                    <Select                      
                      input={<Input name="delivery" id="delivery-label-placeholder" />}
                      displayEmpty
                      name="dmethod"    
                    >
                      <MenuItem value="">
                        <em>Please select...</em>
                      </MenuItem>
                      <MenuItem value={1}>$20 services by drone (same day during business hours)</MenuItem>                     
                      
                    </Select>
                  </FormControl>
                </div>

              </Paper>
                </div>






              <h4 style={subhder}>3. PAYMENT</h4>
              <div style={
                {
                border: '1px solid #f5f5f5',
                margin: "0% 10% 2% 10%"
                }
              }>  
              <Paper>
              <TextField
                  id="Billing street"
                  name="bstreet"
                  label="Billing Street"             
                  value={this.state.bstreet}
                  onChange={this.handleChange('bstreet')}
                  placeholder="Street"
                  margin="normal"
                  variant="outlined"
                  style = {{width:'86.5%',marginLeft:"6.5%"}}
                  required
                /> &nbsp;&nbsp;&nbsp;

              

                <TextField
                  id="Billing city"
                  name="bcity"
                  label="Billing City"              
                  value={this.state.bcity}
                  onChange={this.handleChange('bcity')}
                  placeholder="City"
                  margin="normal"
                  variant="outlined"
                  style = {{width:'29.2%',marginLeft:"6.5%"}}
                  required
                /> &nbsp;&nbsp;&nbsp;

                <TextField
                  id="Billing State"
                  name="bstate"
                  label="Billing State"        
                  value={this.state.bstate}
                  onChange={this.handleChange('bstate')}
                  placeholder="State"
                  margin="normal"
                  variant="outlined"
                  style = {{width:'29.5%'}}
                  required
                /> &nbsp;&nbsp;&nbsp;
                  

                  <TextField
                  id="Billing zipcode" 
                  name="bzipcode"
                  label="Billing Zip Code"                                       
                  value={this.state.bzipcode}
                  onChange={this.handleChange('bzipcode')}
                  placeholder="Zip code"
                  margin="normal"
                  variant="outlined"       
                  style = {{width:'24.6%'}}
                  required         
                /> <br/>

              
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
                  style = {{width:'38%',marginLeft:"6.5%"}}
                  required   
               /> &nbsp;&nbsp;&nbsp;

               <TextField
                  id="Expired Date"     
                  label="MM/YY"                           
                  value={this.state.exdate}
                  onChange={this.handleChange('exdate')}
                  placeholder="Expired Date"
                  margin="normal"
                  variant="outlined" 
                  style = {{width:'22.5%'}}
                  required     
               /> &nbsp;&nbsp;&nbsp;

                
                <TextField
                  id="cvv"     
                  label="XXX"                           
                  value={this.state.cvv}
                  onChange={this.handleChange('cvv')}
                  placeholder="CVV"
                  margin="normal"
                  variant="outlined"   
                  style = {{width:'22.5%'}}
                  helperText="Last three digits on signature strip"
                  required
               /> <br/>  
               
               </Paper>          
            </div>
            
            

          <h4 style={subhder}>4. REVIEW ORDER</h4>  
          <div style={table}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{background:'#f5f5f5',color:'black'}}>Item</TableCell>
                  <TableCell style={{background:'#f5f5f5',color:'black'}} align="right">Price</TableCell>
                  <TableCell style={{background:'#f5f5f5',color:'black'}} align="right">Quantity</TableCell>
                  <TableCell style={{background:'#f5f5f5',color:'black'}} align="right">Total</TableCell>
              </TableRow>
              </TableHead>

              <TableBody>
                {/* For mapping list of item
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  </TableRow>
                ))}
                 */}

                 {/* Delete <br/><br/><br/><br/> after mapping for item -->*/} <br/><br/><br/><br/>
                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={2}>Subtotal:</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Tax:</TableCell>
                  <TableCell align="right"></TableCell>
                  
                </TableRow>

                <TableRow>
                  <TableCell>Shipping fee:</TableCell>
                  <TableCell align="right"></TableCell>
                  
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>Total:</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          </div>
            
             <br/>
            <Button style={{marginLeft:"45%", marginBottom:"1%"}} size="large" variant="contained" color="primary" id="buttons" type="submit">
              Place Order
            </Button>
            <p style={{textAlign:"center"}}>By clicking the Place Order button, you confirm that you have read and underestood, and accept our Terms and Conditions, Return Policy, and Privacy Policy.</p>
        </form>
        
        
          </div>

          {/* Order summary*/}
          

        </div>
      </React.Fragment>
    );
  }
}

export default App;
