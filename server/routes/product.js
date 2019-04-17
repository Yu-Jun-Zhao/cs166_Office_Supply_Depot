import express from "express";
const router = express.Router();
import connection from "../db";

router.get("/:name/:offset", (req, res) => {
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
router.get("/:offset", (req, res) => {
  const { offset } = req.params;
  const select_sql = `SELECT * FROM product LIMIT ${offset}`;

  connection.query(select_sql, (error, results) => {
    if (error) res.send(error);
    res.send({ products: results });
  });
});

export default router;
