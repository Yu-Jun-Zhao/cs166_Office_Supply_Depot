import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


const color = blue[50];
const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    htmlfontSize: [10, 14, 60].join(','),
  },
});
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: color,
    margin: 'auto',
    width: '70%',
    height: '70%',
  },
  image:{
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  imgsize:{
    width: 468,
    height: 468,
  },
});

/* test data */
let id = 0;
function createData(pName, price, weight, desc, quantity) {
  id += 1;
  return { pName, price, weight, desc, quantity };
}

const product1 = createData('Monster Pencil Case', 1, 3.0,
  'A zipped monster pencil case! Store your pens, pencils, highlighters in this for organization', 15)


class ItemTemplate extends React.Component{
  render() {
    const { classes, product } = this.props;
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
      <ul>
        <div>
        <Grid container spacing={24} alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='h4'>{product1.pName}</Typography>
            </Grid>
            <Grid item xs={6} >
              <ButtonBase className={classes.imgsize}>
                <img className={classes.image} alt="image" src='https://upload.wikimedia.org/wikipedia/commons/f/fe/ZIPIT_pencil_case.jpg'></img>
              </ButtonBase>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
              <Typography variant='subtitle1'>Price: {formatter.format(product1.price)}</Typography>
              <Typography variant='subtitle1'>Weight: {product1.weight}</Typography>
              <Grid><Typography variant='subtitle1'>Description</Typography>
              <Typography variant='subtitle2'>{product1.desc} </Typography>
              </Grid>
              </Paper>
            </Grid>
        </Grid>
        </div>
      </ul>
      <Divider variant="middle" />
      <br />
      <div align="center">
        <Button component={Link} to="/shopping-cart" variant="contained" color="blue">
          Add to cart
        </Button>
      </div>
      <br /><br />
      </div>
      </MuiThemeProvider>
    );
  }
}

const ItemTemplate1 = ({ product }) => {
  const { name, price, weight, description, quantity } = product
  return (
    <Grid container spacing={24}>
        <Grid item xs>
          <h2>{product.pName}</h2>
        </Grid>
        <Grid item xs={6}>
          <Paper>image</Paper>
        </Grid>
        <Grid item xs={6}>
          <h3>Price: {product.price}</h3>
          <h4>Weight: {weight}</h4>
          <h4>Description: {product.desc}</h4>
        </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  product: state.product.items,
});

ItemTemplate.propTypes = {
  name: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
  weight: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired,
  quantity: PropTypes.object.isRequired,
}

export default withStyles(styles)(ItemTemplate);
