import express from "express";
const router = express.Router();
import connection from "../db";

// Order routes will be protected

/*
// @router POST /api/order/all/:userId
// @desc   Retrieve all orders
// @private
router.get("/all/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM \`order\` WHERE user_id = "${userId}"`;
  connection.query(sql, (err, results) => {
    if (err) res.send(err);
    res.json(results);
  });
});
*/

// @router POST /api/order/add
// @desc   Create order
// @private
router.post("/add", (req, res) => {
  const { userId, address, city, state, zip, f_address } = req.body;
  const today = new Date();
  const orderDate =
    new Date(`${today} GMT`).toISOString().split("T")[0] +
    " " +
    today.toTimeString().split(" ")[0];
  const sql = `CALL createOrder(
    "${userId}","${orderDate}", "${address}", "${city}", "${state}", "${zip}", ${f_address})`;

  connection.query(sql, (err, results) => {
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
  connection.query(sql, (err, results) => {
    if (err) return res.send(err);
    const nestedSql = `SELECT * FROM \`order\` WHERE user_id = "${userId}"`;
    connection.query(nestedSql, (err, results) => {
      if (err) res.send(err);
      return res.json(results);
    });
  });
});

export default router;
