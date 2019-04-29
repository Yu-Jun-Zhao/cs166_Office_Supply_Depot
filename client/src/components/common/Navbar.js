import { withAuth } from "@okta/okta-react";
import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import {
  checkAuthentication,
  logOutUser
} from "../../actions/authenticateActions";
import { connect } from "react-redux";

const navbartheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0d47a1",
      light: "#5472d3",
      dark: "#002171"
    },
    secondary: {
      main: "#8e24aa",
      light: "#c158dc",
      dark: "#5c007a"
    }
  }
});

const styles = theme => ({
  appBarRoot: {
    zIndex: 999999
  },
  grow: {
    flexGrow: 1
  },
  text: {
    color: "#fff"
  },
  left: {
    paddingRight: "80%"
  },
  menuList: {
    zIndex: 999
  }
});

const menuGrowStyle = placement => ({
  transformOrigin: placement === "bottom" ? "center top" : "center bottom"
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      anchorEl: null
    };
    //this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.checkAuthentication(
      this.props.auth,
      this.props.authentication.isAuthenticated,
      this.props.authentication.userInfo
    );
  }

  async login() {
    this.props.auth.login("/user");
  }

  async logout() {
    this.props.logOutUser();
    this.props.auth.logout("/");
  }

  handleMenu = event => {
    //console.log("opening");
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    //console.log("close");
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.authentication;
    const userLink = "/";

    const open = Boolean(this.state.anchorEl);
    return (
      <div>
        <MuiThemeProvider theme={navbartheme}>
          <AppBar position="relative" classes={{ root: classes.appBarRoot }}>
            <Toolbar>
              <Link component={RouterLink} to="/" underline="none">
                <Typography
                  variant="h5"
                  color="inherit"
                  className={classes.text}
                >
                  Office Supply Depot
                </Typography>
              </Link>
              <div className={classes.grow} />
              <div>
                {isAuthenticated && (
                  <div>
                    <IconButton
                      color="inherit"
                      className={classes.menuButton}
                      aria-owns={open ? "menu-appbar" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={this.handleMenu}
                      component={RouterLink}
                      to="/user"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Popper
                      open={open}
                      anchorEl={this.state.anchorEl}
                      transition
                      disablePortal
                      onMouseLeave={this.handleClose}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="menu-appbar"
                          style={menuGrowStyle(placement)}
                        >
                          <Paper elevation={8}>
                            {/*this is just a listener to listen to clicks */}
                            <ClickAwayListener onClickAway={this.handleClose}>
                              {/* This is the Menu*/}
                              <MenuList>
                                {this.props.authentication.userInfo.groups ===
                                "admin" ? (
                                  <MenuItem onClick={this.handleClose}>
                                    <Link
                                      component={RouterLink}
                                      to="/admin"
                                      underline="none"
                                    >
                                      Admin Panel
                                    </Link>
                                  </MenuItem>
                                ) : null}
                                <MenuItem onClick={this.handleClose}>
                                  <Link
                                    component={RouterLink}
                                    to="/cart"
                                    underline="none"
                                  >
                                    Cart
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose}>
                                  <Link
                                    component={RouterLink}
                                    to="/orders"
                                    underline="none"
                                  >
                                    Orders
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={this.logout}>
                                  Logout
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                )}
                {!isAuthenticated && (
                  <div className={classes.menuButton}>
                    <Button color="inherit" onClick={this.login}>
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

const NavbarWithStyle = withStyles(styles)(Navbar);

export default connect(
  mapStateToProps,
  { checkAuthentication, logOutUser }
)(withAuth(NavbarWithStyle));
