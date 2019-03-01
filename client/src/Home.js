import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  render() {
    return (
      <div>
        {this.state.authenticated !== null &&
        <div>
          {this.state.authenticated &&
            <div>
              <p> Welcome back, {this.state.userinfo.name}! </p>
              <p> You are authenticated </p>
            </div>
          }
          {!this.state.authenticated &&
            <div>
              <p> Not authenticated </p>
              <Button id="login-button" primary onClick={this.login}>Login</Button>
            </div>
          }
        </div>
        }
      </div>
    );
  }
});
