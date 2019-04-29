import express from "express";
const router = express.Router();
import pool from "../db";
import {
  authenticationRequired,
  adminAuthenticationRequired
} from "../AuthenticationMiddleware/AuthenticationMiddleware";


const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyB6bOePa__5vSd4Ri5ogaaN8Dw-k_plH-M'
});

// Order routes will be protected

/*
// @router POST /api/order/all/:userId
// @desc   Retrieve all orders
// @private
router.get("/all/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM \`order\` WHERE user_id = "${userId}"`;
  pool.query(sql, (err, results) => {
    if (err) res.send(err);
    res.json(results);
  });
});
*/

// @router POST /api/order/add
// @desc   Create order
// @private
router.post("/add", authenticationRequired, (req, res) => {
  const { userId, address, city, state, zip, f_address } = req.body;
  const today = new Date();
  const orderDate =
      new Date(`${today} GMT`).toISOString().split("T")[0] +
      " " +
      today.toTimeString().split(" ")[0];
  const sql = `CALL createOrder(
    "${userId}","${orderDate}", "${address}", "${city}", "${state}", "${zip}", ${f_address})`;

  pool.query(sql, (err, results) => {
    if (err) return res.send(err);
    return res.send({ success: true });
  });
});

// @router POST /api/order/check/:userId
// @desc   Check and Update status or orders and Retrieve all orders
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

router.get("/address/:addressId", authenticationRequired, (req, res) => {
  const { addressId } = req.params;
  const sql = `SELECT * FROM shipping_address WHERE s_address_id = ${addressId}`;
  pool.query(sql, (err, results) => {
    if (err) return res.send(err);
    return res.send(results[0]);
  });
});

router.post("/route", (req, res) => {
  const {origin, destination} = req.body
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
    destination: destination,
    departure_time: new Date(),
    traffic_model: 'pessimistic'
  }, function (err, response) {
    const x = response.json.routes[0].legs[0]
    if (!err) {
      res.send({ distance: x.distance.text, origin: originLL});
    }
  });
});

export default router