import express from "express";
const router = express.Router();
import pool from "../db";
import {
  authenticationRequired,
  adminAuthenticationRequired
} from "../AuthenticationMiddleware/AuthenticationMiddleware";

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

router.get("/address/:addressId", authenticationRequired, (req, res) => {
  const { addressId } = req.params;
  const sql = `SELECT * FROM shipping_address WHERE s_address_id = ${addressId}`;
  pool.query(sql, (err, results) => {
    if (err) return res.send(err);
    return res.send(results[0]);
  });
});

export default router;
