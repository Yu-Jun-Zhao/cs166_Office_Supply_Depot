import React, { Component } from 'react';
import ItemHolder from "../common/Product";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  fetchProducts,
  changeOffset,
} from "../../actions/productActions";
import TableItemsList from "../../components/common/TableItemsList";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';



/* try this */
import axios from 'axios';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 15,
  },
  ordertable:{
    boxShadow: '10px 10px 5px #CCC',
    borderRadius: '25px',
    width:20,
    height: 20,
    left: 10,
  },
  noborder:{
    border: theme.palette.common.white,
  },
  center: {
    margin: 'auto',
    width: '80%',
    height: '100%',
  },
  textField: {
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
 },
});
/* test data */
let id = 0;
function createData(pName, price, weight, quantity) {
  id += 1;
  return { pName, price, weight, quantity };
}

const rows = [
  createData('Frozen yoghurt', 15.9, 6.0, 1,),
  createData('Ice cream sandwich', 2.37, 9.0, 37),
  createData('Eclair', 2.62, 16.0, 24),
  createData('Cupcake', 3.05, 3.7, 67),
  createData('Gingerbread', 3.56, 16.0, 49),
  createData('Monster Pencil Case', 1, 3.0, 1),
];
/* end of test data */


class Shoppingcart extends Component{
  state = {
    items: [],
    quantity: 1,
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        console.log(res);
        this.setState({items: res.data});
      })
  }

  handleChange = event => {
    this.setState({ [event.target.quantity]: event.target.value });
  };
  handleQtyChange = name => event => {
   this.setState({[name]: event.target.value });
 };

  render() {
    const { classes, products } = this.props;
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    var subtotal = 0;
    var tax = 0.095;
    var grandtotal = 0;
    var totalWeight = 0;
    var totalQuantity = 0;
    return (
      <div className={classes.root}>
      <div className={classes.center}>
        <br />
        <div><Typography variant='h3'>Here's your shopping cart!</Typography></div>
        <Grid container spacing={24}>
          <Grid item xs={9}>
          <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.noborder}>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell></TableCell>
                <TableCell>Item Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row =>{
                const t = row.price * row.quantity;
                const total = formatter.format(t);
                subtotal += t;
                totalQuantity += row.quantity;
                totalWeight += row.weight;
                return(
                <TableRow key = {row.id}>
          				  <TableCell>{row.pName}</TableCell>
          			    <TableCell>{formatter.format(row.price)}</TableCell>
          	        <TableCell>
                      <FormControl>
                      <TextField
                        id="standard-number"
                        label="Qty"
                        value={row.quantity}
                        onChange={this.handleQtyChange('row.quantity')}
                        type="number"
                        fontSize="16"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: {fontSize: 13}
                        }}
                      />
                      </FormControl>
                    </TableCell>
                    <TableCell>{row.weight} lbs</TableCell>
          				  <TableCell><Button variant="outlined">Remove</Button></TableCell>
          				  <TableCell>{total}</TableCell>
          			 </TableRow>
               );
              })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>{formatter.format(subtotal)}</TableCell>
                <TableCell></TableCell>
                <TableCell>{totalWeight} lbs</TableCell>
                <TableCell> </TableCell>
                <TableCell>{subtotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        </Grid>
        <Grid xs={3} direction="column" justify='flex-start' alignItems='stretch'>
          <Grid xs={3}>
			     <Table className={classes.ordertable}>
            <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell>{formatter.format(subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax({tax*100}%)</TableCell>
                <TableCell>{formatter.format(tax*subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Grand Total</TableCell>
                <TableCell>{formatter.format((subtotal*tax)+subtotal)}</TableCell>
              </TableRow>
            </TableBody>
		       </Table>
           </Grid>
           <br />
           <Button component={Link} to="/checkout" variant="contained" color="primary">
            Checkout
          </Button>
        </Grid>
        </Grid>
        <br />
        </div>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  products: state.products.items
});
const shopping = withStyles(styles)(Shoppingcart);
export default withRouter(connect(mapStateToProps)(shopping));
