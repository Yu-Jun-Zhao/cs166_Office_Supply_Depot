import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";
import { Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { checkAuthentication } from "../../actions/authenticateActions";

//import { checkAuthentication } from "../../util/helpers";

class Profile extends Component {
  constructor(props) {
    super(props);
    //this.state = { userInfo: null, ready: false };
  }

  // Need to changes these code later
  componentDidMount() {
    this.props.checkAuthentication(
      this.props.auth,
      this.props.authentication.isAuthenticated,
      this.props.authentication.userInfo
    );
  }

  componentDidUpdate() {
    this.props.checkAuthentication(
      this.props.auth,
      this.props.authentication.isAuthenticated,
      this.props.authentication.userInfo
    );
  }

  render() {
    const { isAuthenticated, userInfo } = this.props.authentication;

    return (
      <div>
        {!isAuthenticated && <p>Fetching user profile..</p>}
        {isAuthenticated && (
          <div>
            <Header as="h1">
              <Icon name="drivers license outline" /> My User Profile (ID Token
              Claims){" "}
            </Header>
            <p>
              Below is the information from your ID token which was obtained
              during the
              <a href="https://developer.okta.com/authentication-guide/implementing-authentication/implicit">
                Implicit Flow
              </a>{" "}
              and is now stored in local storage.
            </p>
            <p>
              This route is protected with the <code>&lt;SecureRoute&gt;</code>{" "}
              component, which will ensure that this page cannot be accessed
              until you have authenticated.
            </p>
            <Table>
              <thead>
                <tr>
                  <th>Claim</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userInfo).map(claimEntry => {
                  const claimName = claimEntry[0];
                  const claimValue = claimEntry[1];
                  const claimId = `claim-${claimName}`;
                  return (
                    <tr key={claimName}>
                      <td>{claimName}</td>
                      <td id={claimId}>{claimValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(
  mapStateToProps,
  { checkAuthentication }
)(withAuth(Profile));
