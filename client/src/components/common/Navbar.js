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

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import {
  checkAuthentication,
  logOutUser
} from "../../actions/authenticateActions";
import { connect } from "react-redux";

const navbartheme = createMuiTheme({
  palette: {
    primary: {
      main: "#29b6f6",
      light: "#73e8ff",
      dark: "#0086c3"
    },
    secondary: {
      main: "#8e24aa",
      light: "#c158dc",
      dark: "#5c007a"
    }
  }
});

const styles = {
  grow: {
    flexGrow: 1
  },
  text: {
    color: "#fff"
  },
  left: {
    paddingRight: "80%"
  },
  menuButton: {}
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      stayEntered: false,
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
    if (!this.state.stayEntered) {
      console.log("opening");
      this.setState({
        anchorEl: event.currentTarget,
        stayEntered: true
      });
    }
  };

  handleClose = () => {
    console.log("closing");

    this.setState({
      anchorEl: null,
      stayEntered: false
    });
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.authentication;
    const userLink = isAuthenticated ? "/user" : "/";
    const open = Boolean(this.state.anchorEl);
    return (
      <div>
        <MuiThemeProvider theme={navbartheme}>
          <AppBar position="static">
            <Toolbar>
              <Link component={RouterLink} to={userLink} underline="none">
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
                    >
                      <AccountCircle />
                    </IconButton>

                    <MenuList
                      id="menu-appbar"
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={open}
                      onMouseLeave={() => {
                        console.log("exiting");
                      }}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </MenuList>
                  </div>
                )}
                {!isAuthenticated && (
                  <div className={classes.menuButton}>
                    <Button color="inherit" href="/login">
                      LOGIN
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

/*
<Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header href={`${userLink}`}>
              <Image size="mini" src="/react.svg" />
              &nbsp; OSD
            </Menu.Item>

            {isAuthenticated && (
              <Menu.Item id="profile-button" as="a" href="/profile">
                Profile
              </Menu.Item>
            )}
            {isAuthenticated && (
              <Menu.Item id="logout-button" as="a" onClick={this.logout}>
                Logout
              </Menu.Item>
            )}
            {!isAuthenticated && (
              <Menu.Item as="a" onClick={this.login}>
                Login
              </Menu.Item>
            )}
          </Container>
        </Menu>
*/

const mapStateToProps = state => ({
  authentication: state.authentication
});

const NavbarWithStyle = withStyles(styles)(Navbar);

export default connect(
  mapStateToProps,
  { checkAuthentication, logOutUser }
)(withAuth(NavbarWithStyle));
