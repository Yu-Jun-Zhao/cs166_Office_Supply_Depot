export default {
  resourceServer: {
    port: 8000,
    oidc: {
      issuer: "https://dev-170933.okta.com/oauth2/default"
    },
    assertClaims: {
      aud: "api://default",
      cid: "0oadw3zeo3phZEALM356"
    }
  }
};
