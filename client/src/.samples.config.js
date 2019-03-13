export default {
  oidc: {
    clientId: "0oabit57iUwlAezus356",
    issuer: "https://dev-543515.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/implicit/callback",
    scope: "openid profile email"
  },
  resourceServer: {
    messagesUrl: "http://localhost:8000/api/messages"
  }
};
