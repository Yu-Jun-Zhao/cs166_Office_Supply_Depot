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
router.post("/add", (req, res) => {
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
router.put("/check/:userId", (req, res) => {
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
router.get("/address/:addressId", (req, res) => {
  const { addressId } = req.params;
  const sql = `SELECT * FROM shipping_address WHERE s_address_id = ${addressId}`;
  pool.query(sql, (err, results) => {
    if (err)
      return res.status(404).send({ error: "Unable to retrieve address" });
    return res.send(results[0]);
  });
});

router.post("/route", (req, res) => {
  const { origin } = req.body;
  let originLL = {};
  googleMapsClient.geocode(
    {
      address: origin
    },
    function(err, response) {
      if (!err) {
        originLL = response.json.results[0]["geometry"]["location"];
        return res.send({ origin: originLL });
      } else {
        return res.send(err);
      }
    }
  );
});

export default router;
