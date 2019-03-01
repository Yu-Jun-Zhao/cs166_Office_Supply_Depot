import express from 'express'
import sampleConfig from './.samples.config'
import OktaJwtVerifier from '@okta/jwt-verifier'
import cors from 'cors'
import mysql from 'mysql'

/*
// Enter your db info here
const connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

connection.connect()

*/

/**
Sharing the same okta account unless we all wanna make our own
 */
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: sampleConfig.resourceServer.oidc.issuer,
  clientId: sampleConfig.resourceServer.assertClaims.cid,
  assertClaims: sampleConfig.resourceServer.assertClaims,
});

/**
 * A simple middleware that asserts  valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
      .then((jwt) => {
        req.jwt = jwt;
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
}

function adminAuthenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
      .then((jwt) => {
        if (!jwt.claims.groups.includes('Administrator')) return next('Unauthorized');
        req.jwt = jwt;
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
}

const app = express();

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello!  There\'s not much to see here :) Please grab one of our front-end samples for use with this sample resource server'
  });
});

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', authenticationRequired, (req, res) => {
  res.json({
    messages: [
      {
        date:  new Date(),
        text: 'I am a robot.'
      },
      {
        date:  new Date(new Date().getTime() - 1000 * 60 * 60),
        text: 'Hello, world!'
      }
    ]
  });
});

app.listen(8000, () => {
  console.log(`Resource Server Ready on port 8000`);
});