import React, { Component } from "react";
import * as OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import "@okta/okta-signin-widget/dist/css/okta-theme.css";

import config from "../../config/config";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.signIn = new OktaSignIn({
      baseUrl: config.oidc.issuer.split("/oauth2")[0],
      clientId: config.oidc.clientId,
      redirectUri: config.oidc.redirectUri,
      logo: "/react.svg",
      features: {
        registration: true
      },
      i18n: {
        en: {
          "primaryauth.title": "Sign in to OSD"
        }
      },
      authParams: {
        responseType: ["id_token", "token"],
        issuer: config.oidc.issuer,
        display: "page",
        scopes: config.oidc.scope.split(" ")
      }
    });
  }

  componentDidMount() {
    this.signIn.renderEl(
      { el: "#sign-in-widget" },
      res => {
        /**
         * In this flow, the success handler will not be called beacuse we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }

  render() {
    return (
      <div>
        <div id="sign-in-widget" />
      </div>
    );
  }
}
