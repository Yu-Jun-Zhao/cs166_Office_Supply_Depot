import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const color = blue[50];
const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    htmlfontSize: [10, 14, 60].join(",")
  }
});
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "90%",
    marginTop: theme.spacing.unit * 3,
    margin: "auto"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.white,
    margin: "auto",
    width: "100%",
    height: "70%"
  },
  image: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  imgsize: {
    color: theme.palette.common.white,
    width: 480,
    height: 300
  },
  textField: {
    flexBasis: 200
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 50,
    textAlign: "center"
  }
});

/* test data */
let id = 0;
function createData(pName, price, weight, desc, quantity) {
  id += 1;
  return { pName, price, weight, desc, quantity };
}

const product1 = createData(
  "Monster Pencil Case",
  1,
  3.0,
  "A zipped monster pencil case! Store your pens, pencils, highlighters in this for organization",
  15
);

class ItemTemplate extends React.Component {
  state = {
    quantity: 1,
    open: false /* for quantity selection */,
    dialogOpen: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes, product } = this.props;
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <ul>
            <div>
              <Grid container spacing={24} alignItems="center">
                <Grid item xs={6}>
                  <Paper className={classes.imgsize}>
                    <img
                      className={classes.image}
                      alt="image"
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fe/ZIPIT_pencil_case.jpg"
                    />
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper elevation="0" className={classes.paper}>
                    <Typography variant="h4">{product1.pName}</Typography>
                    <Typography variant="h5">
                      {formatter.format(product1.price)}
                    </Typography>
                    <Typography variant="subtitle1">
                      Weight: {product1.weight}lbs
                    </Typography>
                    <form autoComplete="off">
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-quantity">Qty</InputLabel>
                        <Select
                          open={this.state.open}
                          onClose={this.handleClose}
                          onOpen={this.handleOpen}
                          value={this.state.quantity}
                          onChange={this.handleChange}
                          inputProps={{
                            name: "quantity",
                            id: "select-quantity"
                          }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={7}>7</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                          <MenuItem value={9}>9</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={11}>11</MenuItem>
                          <MenuItem value={12}>12</MenuItem>
                          <MenuItem value={13}>13</MenuItem>
                        </Select>
                      </FormControl>
                    </form>
                    <br />
                    {/*<Button component={Link} to="/shopping-cart" variant="contained" color="blue">*/}
                    <Button
                      onClick={this.handleDialogOpen}
                      variant="contained"
                      color="blue"
                    >
                      Add to cart
                    </Button>
                    <Dialog
                      open={this.state.dialogOpen}
                      onClose={this.handleDialogClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Added to Cart"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Continue shopping or go to shopping cart
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleDialogClose} color="blue">
                          Continue Shopping
                        </Button>
                        <Button
                          component={Link}
                          to="/shopping-cart"
                          variant="contained"
                          color="blue"
                          autoFocus
                        >
                          Go to Shopping Cart
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </ul>
          <Divider variant="middle" />
          <br />
          <div align="center">
            <Typography variant="h5">{product1.desc} </Typography>
          </div>
          <br />
          <br />
        </div>
      </MuiThemeProvider>
    );
  }
}

const ItemTemplate1 = ({ product }) => {
  const { name, price, weight, description, quantity } = product;
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
};

const mapStateToProps = state => ({
  product: state.product.items
});

ItemTemplate.propTypes = {
  name: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
  weight: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired,
  quantity: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemTemplate);
