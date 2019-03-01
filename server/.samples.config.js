export default {
  resourceServer: {
    port: 8000,
    oidc: {
      issuer: 'https://dev-543515.okta.com/oauth2/default'
    },
    assertClaims: {
      aud: "api://default",
      cid: "0oabit57iUwlAezus356",
    }
  }
};
