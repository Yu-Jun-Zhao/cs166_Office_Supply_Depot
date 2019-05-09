import express from "express";
import cors from "cors";
import pool from "./db";

import {
  authenticationRequired,
  adminAuthenticationRequired
} from "./AuthenticationMiddleware/AuthenticationMiddleware";

//import bodyparser from "body-parser";

import products from "./routes/product";
import user from "./routes/user";
import cart from "./routes/cart";
import order from "./routes/order";

const app = express();
app.use(express.json());

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

/*
  Returns a json object in this form
  {
    products: [{product 1, product 2, ...}],
    total: total
  }
 */

// ADD ROUTES
app.use("/api/products", products);
app.use("/api/user", user);
app.use("/api/cart", cart);
app.use("/api/order", order);
/// TODO
/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get("/secure", authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get("/api/messages", authenticationRequired, (req, res) => {
  res.json({
    messages: [
      {
        date: new Date(),
        text: "I am a robot."
      },
      {
        date: new Date(new Date().getTime() - 1000 * 60 * 60),
        text: "Hello, world!"
      }
    ]
  });
});

app.listen(8000, () => {
  console.log(`Resource Server Ready on port 8000`);
});

app.post("/api/route", (req, res) => {
    const { origin, destination } = req.body
    googleMapsClient.geocode({
        address: origin
    }, function(err, response) {
        if (!err) {
            console.log(response.json.results[0]["geometry"]["location"]);
        }
    });
    googleMapsClient.directions({
        origin: origin,
        destination: destination,
        departure_time: new Date(),
        traffic_model: 'pessimistic'
    }, function(err, response) {
        const x = response.json.routes[0].legs[0]
        if (!err) {
            res.send({distance: x.distance.text});
        }
    });

});

app.get("/", (req, res) => {
  res.json({
    message:
      "Hello!  There's not much to see here :) Please grab one of our front-end samples for use with this sample resource server"
  });
});

