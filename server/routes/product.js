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

// @router PUT api/products/1/id/:id
// @desc   Retrieve the product based on id
// @access Public
router.get("/1/id/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM product WHERE product_id = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) res.send(error);
    res.json({ product: results });
  });
});

// FOR ADMIN
// @router  POST api/products/add
// @desc    Add new item to products list
// @access private
router.post("/add", (req, res) => {
  const {
    pName,
    weight,
    quantity,
    price,
    description,
    imgPath,
    type
  } = req.body;
  const insert_sql = `INSERT INTO product (p_name, quantity, price, weight, description, imgPath, type) values ('${pName}', '${quantity}', '${price}', '${weight}', '${description}', '${imgPath}', '${type}')`;

  connection.query(insert_sql, (error, results) => {
    if (error) {
      return res.status(400).send({
        message: "Error"
      });
    }
    res.sendStatus(200);
  });
});

router.delete("/delete", (req, res) => {
  const { listOfProductId } = req.body;
  for (var i = 0; i < listOfProductId.length; i++) {
    const sql = `DELETE FROM product WHERE product_id = ${listOfProductId[i]}`;
    connection.query(sql, (error, results) => {
      if (error)
        return res.status(400).send({
          error: "Bad Request"
        });
      res.sendStatus(200);
    });
  }
});

export default router;
