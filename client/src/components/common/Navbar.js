@ -1,75 +0,0 @@
import { withAuth } from "@okta/okta-react";
import React, { Component } from "react";
import { Container, Icon, Image, Menu } from "semantic-ui-react";
//import { checkAuthentication } from "../../util/helpers";
import {
  checkAuthentication,
  logOutUser
} from "../../actions/authenticateActions";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
    //this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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

  render() {
    const { isAuthenticated } = this.props.authentication;
    const userLink = isAuthenticated ? "/user" : "/";
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(
  mapStateToProps,
  { checkAuthentication, logOutUser }
)(withAuth(Navbar));
