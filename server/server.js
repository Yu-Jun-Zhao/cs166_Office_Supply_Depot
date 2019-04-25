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

/*
app.get("/api/products/:name/:offset", (req, res) => {
  const { name, offset } = req.params;
  const count_sql = `SELECT COUNT(*) as total FROM product WHERE pName LIKE '%${name}%'`;
  const select_sql = `SELECT * FROM product WHERE pName LIKE '%${name}%' LIMIT 10 OFFSET ${offset}`;

  let json = {};
  connection.query(select_sql, (error, results) => {
    if (error) res.send(error);
    let arr = [];
    for (let i = 0; i < results.length; i++) {
      arr.push(results[i]);
    }
    json = { products: arr };
  });
  connection.query(count_sql, (error, results) => {
    if (error) res.send(error);

    json["total"] = results[0].total;
    res.json(json);
  });
});

// Returns object that contains an array of objects
app.get("/api/products/:offset", (req, res) => {
  const { offset } = req.params;
  const select_sql = `SELECT * FROM product LIMIT ${offset}`;

  connection.query(select_sql, (error, results) => {
    if (error) res.send(error);
    res.send({ products: results });
  });
});

app.get("/", (req, res) => {
  res.json({
    message:
      "Hello!  There's not much to see here :) Please grab one of our front-end samples for use with this sample resource server"
  });
});
*/
