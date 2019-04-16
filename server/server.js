import express from "express";
import cors from "cors";
import mysql from "mysql";
import {
  authenticationRequired,
  adminAuthenticationRequired
} from "./AuthenticationMiddleware/AuthenticationMiddleware";
import bodyparser from "body-parser";

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB6bOePa__5vSd4Ri5ogaaN8Dw-k_plH-M'
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "osd",
  port: 3306
});

// Create database on the fly
// For Development only
connection.connect(err => {
  if (err) throw err;
  connection.query("CREATE DATABASE IF NOT EXISTS osd", (err, result) => {
    if (err) throw err;
  });
});

let sql =
  "CREATE TABLE IF NOT EXISTS product(id INT AUTO_INCREMENT, pName VARCHAR(255), quantity INT, price FLOAT, weight FLOAT, PRIMARY KEY (id))";
connection.query(sql, (err, result) => {
  if (err) throw err;
});

////////////////////////////////////

const app = express();
app.use(bodyparser.json());

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

app.post("/api/route", (req, res) => {
    const { origin, destination } = req.body
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
