import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import { Container } from "semantic-ui-react";
import config from "./config/config";
import store from "./store";
import { Provider } from "react-redux";

import Homepage from "./components/pages/Homepage";
import CustomLoginComponent from "./components/auth/Login";
import Navbar from "./components/common/Navbar";
import Profile from "./components/pages/Profile";
import ProductList from "./components/common/ProductList";
import Admin from "./components/pages/Admin";
import Checkout from "./components/pages/Checkout";
import User from "./components/pages/User";
import Shoppingcart from "./components/pages/Shoppingcart";

function customAuthHandler({ history }) {
  // Redirect to the /login page that has a CustomLoginComponent
  history.push("/login");
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
              <Route path="/shopping-cart" component={Shoppingcart} />
              <Route path="/checkout" exact component={Checkout} />
              <SecureRoute path="/profile" component={Profile} />
              <SecureRoute path="/user" component={User} />
              <Route path="/admin" exact component={Admin} />
            </Container>
          </Security>
        </Router>
      </Provider>
    );
  }
}

export default App;
