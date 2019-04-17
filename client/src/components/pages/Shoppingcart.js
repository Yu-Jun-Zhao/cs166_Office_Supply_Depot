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
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  ordertable:{
    width:70,
    height: 70,
    margin: 'right',
    right: 30,
  },
  center: {
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '70%',
    height: '70%',
  }
});
/* test data */
let id = 0;
function createData(pName, price, weight, quantity) {
  id += 1;
  return { pName, price, weight, quantity };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 1,),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

class Shoppingcart extends Component{
  state = {
    items: []
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        console.log(res);
        this.setState({items: res.data});
      })
  }
  render() {
    const { classes, products } = this.props;
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    var subtotal = 0;
    var tax = 0;
    var grandtotal = 0;
    return (
      <div className={classes.center}>
        <div><h1>Here's your shopping cart!</h1></div>
        <div>
          <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Remove</TableCell>
                <TableCell>Item Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <React.Fragment>
              {rows.map(row =>{
                const t = row.price * row.quantity;
                const total = formatter.format(t);
                subtotal += t;
                return(
                <TableRow key = {row.id}>
          				  <TableCell>{row.pName}</TableCell>
          			    <TableCell>{row.price}</TableCell>
          	        <TableCell><input type="number" default value={row.quantity} min="1">
                      </input></TableCell>
                    <TableCell>{row.weight}</TableCell>
          				  <TableCell><Button>Remove</Button></TableCell>
          				  <TableCell>{total}</TableCell>
          			 </TableRow>
               );
              })}
              </React.Fragment>
            </TableBody>
          </Table>
        </Paper>
      </div>
      <div>
		    <h2>Order Summary</h2>
      </div>
			     <Table className={classes.ordertable}>
            <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell>{formatter.format(subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax({tax}%)</TableCell>
                <TableCell>{formatter.format(tax*subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Grand Total</TableCell>
                <TableCell>{formatter.format(grandtotal)}</TableCell>
              </TableRow>
            </TableBody>
		       </Table>
           <br />
           <Button component={Link} to="/checkout" variant="contained" color="blue">
            Checkout</Button>
           </div>
    );
  }
}

const ItemsDisplay = ({ product }) => {
  {/*const { classes, pName, price, weight, quantity } = product*/}
  const { pName, price, weight, quantity } = product
  return (
      <TableRow key = {product.id}>
				  <TableCell>name{pName}</TableCell>
			    <TableCell>price{product.price}</TableCell>
	        <TableCell><input type="number" value={product.quantity} min="1">
            </input></TableCell>
				  <TableCell><Button>Remove</Button></TableCell>
				  <TableCell>total</TableCell>
			 </TableRow>
  );
}

const mapStateToProps = state => ({
  products: state.products.items
});
const shopping = withStyles(styles)(Shoppingcart);
export default withRouter(connect(mapStateToProps)(shopping));
