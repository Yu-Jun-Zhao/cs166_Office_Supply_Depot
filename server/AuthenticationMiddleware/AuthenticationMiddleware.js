import sampleConfig from "../.samples.config";
import OktaJwtVerifier from "@okta/jwt-verifier";

/**
 Sharing the same okta account unless we all wanna make our own
 */
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: sampleConfig.resourceServer.oidc.issuer,
  clientId: sampleConfig.resourceServer.assertClaims.cid,
  assertClaims: sampleConfig.resourceServer.assertClaims
});
/**
 * A simple middleware that asserts  valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
export function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    res.status(401);
    return res.send({ UnauthError: "Unauthorized" });
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      res.status(401).send(err.message);
    });
}

export function adminAuthenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    res.status(401);
    return next("Unauthorized");
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken)
    .then(jwt => {
      if (!jwt.claims.groups.includes("admin")) return next("Unauthorized");
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      res.status(401).send(err.message);
    });
}
