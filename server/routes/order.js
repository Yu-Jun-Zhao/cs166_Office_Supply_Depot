import express from "express";
const router = express.Router();
import pool from "../db";
import {
  authenticationRequired,
  adminAuthenticationRequired
} from "../AuthenticationMiddleware/AuthenticationMiddleware";

const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyB6bOePa__5vSd4Ri5ogaaN8Dw-k_plH-M"
});

// @router POST /api/order/add
// @desc   Create order
// @private
router.post("/add", authenticationRequired, (req, res) => {
  const {
    userId,
    address,
    city,
    state,
    zip,
    f_address,
    delivery_method,
    delivery_time
  } = req.body;
  const today = new Date();
  const orderDate =
    new Date(`${today} GMT`).toISOString().split("T")[0] +
    " " +
    today.toTimeString().split(" ")[0];
  const sql = `CALL createOrder(
    "${userId}","${orderDate}", "${address}", "${city}", "${state}", "${zip}", ${f_address}, ${delivery_method}, ${delivery_time})`;

  pool.query(sql, (err, results) => {
    if (err) return res.status(406).send({ error: "Could not create order" });
    return res.sendStatus(200);
  });
});

// @router PUT /api/order/check/:userId
// @desc   Check and Update status of orders and Retrieve all orders
// @private
router.put("/check/:userId", authenticationRequired, (req, res) => {
  const { userId } = req.params;
  const sql = `CALL checkAllOrderStatus("${userId}")`;
  pool.query(sql, (err, results) => {
    if (err) return res.send(err);
    const nestedSql = `SELECT * FROM \`order\` WHERE user_id = "${userId}"`;
    pool.query(nestedSql, (err, results) => {
      if (err) res.send(err);
      return res.json({ order: results });
    });
  });
});

// @router GET /api/order/address/:addressId
// @desc  GET shipping address based on address id from order
// @private
router.get("/address/:addressId", authenticationRequired, (req, res) => {
  const { addressId } = req.params;
  const sql = `SELECT * FROM shipping_address WHERE s_address_id = ${addressId}`;
  pool.query(sql, (err, results) => {
    if (err)
      return res.status(404).send({ error: "Unable to retrieve address" });
    return res.send(results[0]);
  });
});

router.post("/route", (req, res) => {
  const { origin } = req.body
  let originLL = {}
  googleMapsClient.geocode({
    address: origin
  }, function (err, response) {
    if (!err) {
      originLL = response.json.results[0]["geometry"]["location"];
    }
  });
  googleMapsClient.directions({
    origin: origin,
    destination: '1 Washington Sq, San Jose, CA 95192',
    departure_time: new Date(),
    traffic_model: 'pessimistic'
  }, function (err, response) {
    const x = response.json.routes[0].legs[0]
    if (!err) {
      const distance = x.distance.text.substring(0, x.distance.text.length - 2)
      const droneETA = (distance * 60) / 50
      res.send({ origin: originLL, truckETA: x.duration.text, droneETA: droneETA + ' mins' });
    }
  });
});

export default router;
