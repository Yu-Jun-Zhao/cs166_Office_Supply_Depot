import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import { Container } from "semantic-ui-react";
import config from "./.samples.config";
import Homepage from "./components/pages/Homepage";
import CustomLoginComponent from "./Login";
import Navbar from "./components/common/Navbar";
import Profile from "./Profile";
import ProductList from "./ProductList";
import Admin from "./Admin";
import Checkout from "./Checkout";

function customAuthHandler({ history }) {
  // Redirect to the /login page that has a CustomLoginComponent
  history.push("/login");
}

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Security
            issuer={config.oidc.issuer}
            client_id={config.oidc.clientId}
            redirect_uri={config.oidc.redirectUri}
            onAuthRequired={customAuthHandler}
          >
            <Navbar />
            <Container text style={{ marginTop: "7em" }}>
              <Route path="/" exact component={Homepage} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route path="/login" component={CustomLoginComponent} />
              <Route path="/result" component={ProductList} />
              <Route path="/checkout" exact component={Checkout} />
              <SecureRoute path="/profile" component={Profile} />
              <Route path="/admin" exact component={Admin} />
            </Container>
          </Security>
        </Router>
      </div>
    );
  }
}

export default App;
