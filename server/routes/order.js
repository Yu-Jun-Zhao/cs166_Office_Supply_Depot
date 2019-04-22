import express from "express";
const router = express.Router();
import connection from "../db";

router.post("/add", (req, res) => {
  const { userId, address, city, state, zip } = req.body;
  const today = new Date();
  const sql = `CALL createOrder(
    "${userId}", "${today.getFullYear()}-${today.getMonth()}-${today.getDay()}", 
    "${address}", "${city}", "${state}", "${zip}")`;

  connection.query(sql, (err, results) => {
    if (err) return res.send(err);
    return res.send({ success: true });
  });
});

export default router;
