export default {
  oidc: {
    clientId: "0oadw3zeo3phZEALM356", //"0oabit57iUwlAezus356",
    issuer: "https://dev-170933.okta.com/oauth2/default", //"https://dev-543515.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/implicit/callback",
    scope: "openid profile email groups"
  },
  resourceServer: {
    messagesUrl: "http://localhost:8000/api/messages"
  }
};
