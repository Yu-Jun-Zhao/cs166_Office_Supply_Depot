import express from "express";
import cors from "cors";
import mysql from "mysql";
import {
  authenticationRequired,
  adminAuthenticationRequired
} from "./AuthenticationMiddleware/AuthenticationMiddleware";
import bodyparser from "body-parser";

const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "1234@bcd",
  database: "osd",
  port: 3306
});

// Create database on the fly
// For Now
connection.connect(err => {
  if (err) throw err;
  connection.query("CREATE DATABASE IF NOT EXISTS osd", (err, result) => {
    if (err) throw err;
  });
});

let sql =
  "CREATE TABLE product(id INT AUTO_INCREMENT, pName VARCHAR(255), quantity INT, price FLOAT, weight FLOAT, PRIMARY KEY (id))";
connection.query(sql, (err, result) => {
  if (err) throw err;
});

const app = express();
app.use(bodyparser.json());

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

app.get("/api/products/:name", (req, res) => {
  const name = req.params.name;
  const sql = `SELECT * FROM product WHERE pName LIKE '%${name}%'`;
  connection.query(sql, (error, results) => {
    if (error) res.send(error);
    let arr = [];
    for (let i = 0; i < results.length; i++) {
      arr.push(results[i]);
    }
    const json = { products: arr };
    res.json(json);
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
