import express from "express";
const router = express.Router();
import pool from "../db";

// @router GET "/api/products/o1/:name/:offset"
// @desc Returns the object by similar name
// @access public
router.get("/o1/:name/:offset", (req, res) => {
    const { offset } = req.params;
    const count_sql = `SELECT COUNT(*) FROM product WHERE p_name LIKE '%${name}%' LIMIT 10 OFFSET ${offset}`;
    const select_sql = `SELECT * FROM product WHERE p_name LIKE '%${name}%' LIMIT 10 OFFSET ${offset}`;

    let json = {};

    pool.getConnection((err, connection) => {
        if (err) res.send({ error: "Cannot fetch product data" });

        connection.query(select_sql, (error, results) => {
            if (error) res.send(error);
            let arr = [];
            for (let i = 0; i < results.length; i++) {
                arr.push(results[i]);
            }
            json = { products: arr };
        });
        connection.query(count_sql, (error, results) => {
            json["total"] = results[0].total;

            connection.release();

            if (error) return res.send({ error: "problem getting products" });

            return res.json(json);
        });
    });

});

router.get("/all/:offset", (req, res) => {
  const { offset } = req.params;
  const count_sql = `SELECT COUNT(*) as total FROM product`;
  const select_sql = `SELECT * FROM product LIMIT 10 OFFSET ${offset}`;

  let json = {};

  pool.getConnection((err, connection) => {
    if (err) res.send({ error: "Cannot fetch product data" });

    connection.query(select_sql, (error, results) => {
      if (error) res.send(error);
      let arr = [];
      for (let i = 0; i < results.length; i++) {
        arr.push(results[i]);
      }
      json = { products: arr };
    });
    connection.query(count_sql, (error, results) => {
      json["total"] = results[0].total;

      connection.release();

      if (error) return res.send({ error: "problem getting products" });

      return res.json(json);
    });
  });
});

// @router GET "/api/products/:offset"
// @desc Returns object that contains an array of objects
// @ret {products: [{item1}, {item2}, ....{itemN}]}
// @access public
router.get("/:offset", (req, res) => {
  const { offset } = req.params;
  const select_sql = `SELECT * FROM product LIMIT ${offset}`;

  pool.query(select_sql, (error, results) => {
    if (error) res.send(error);
    res.send({ products: results });
  });
});

// @router GET "/api/products/all/type/:type"
// @desc Return all items of the type specified
// @ret {products: [{item1}, {item2}, ....{itemN}]}
// @access public
router.get("/all/type/:type", (req, res) => {
  const { type } = req.params;
  const sql = `SELECT * FROM product WHERE product.type = "${type}"`;
  pool.query(sql, (err, results) => {
    if (err)
      return res
        .status(404)
        .send({ error: "Could not fetch products with type" });
    return res.send({ products: results });
  });
});

// Returns all the objects of the type
router.get("/all/type/:type/:offset", (req, res) => {
  const { type, offset } = req.params;
  const count_sql = `SELECT COUNT(*) as total FROM product WHERE product.type = "${type}"`;
  const select_sql = `SELECT * FROM product WHERE product.type = "${type}" LIMIT 10 OFFSET ${offset}`;

  let json = {};

  pool.getConnection((err, connection) => {
    if (err) res.send({ error: "Cannot fetch product data" });

    connection.query(select_sql, (error, results) => {
      if (error) res.send(error);
      let arr = [];
      for (let i = 0; i < results.length; i++) {
        arr.push(results[i]);
      }
      json = { products: arr };
    });
    connection.query(count_sql, (error, results) => {
      json["total"] = results[0].total;

      connection.release();

      if (error) return res.send({ error: "problem getting products" });

      return res.json(json);
    });
  });
});

// @router PUT api/products/1/id/:id
// @desc   Retrieve the product based on id
// @access Public
router.get("/1/id/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM product WHERE product_id = ${id}`;
  pool.query(sql, (error, results) => {
    if (error || results.length === 0)
      return res.status(404).send({ error: "Could not fetch product" });
    res.json({ product: results[0] });
  });
});

// FOR ADMIN
// @router  POST api/products/add
// @desc    Add new item to products list
// @access private
router.post("/add", (req, res) => {
  const {
    p_name,
    weight,
    quantity,
    price,
    description,
    imgPath,
    type,
    warehouse
  } = req.body;
  if (
    p_name == null ||
    weight == null ||
    quantity == null ||
    price == null ||
    description == null ||
    imgPath == null ||
    type == null ||
    warehouse == null
  ) {
    return res.status(400).send({
      error: "Bad Request"
    });
  }
  const insert_sql = `INSERT INTO product (p_name, quantity, price, weight, description, imgPath, type, warehouse) values ('${p_name}', '${quantity}', '${price}', '${weight}', '${description}', '${imgPath}', '${type}', '${warehouse}')`;

  pool.query(insert_sql, (error, results) => {
    if (error) {
      return res.status(400).send({
        error: "Could not add item. Possibly this item already exists."
      });
    }
    res.sendStatus(200);
  });
});
// @router  POST api/products/update
// @desc    Update an item
// @access private
router.put("/update", (req, res) => {
  const {
    product_id,
    p_name,
    weight,
    quantity,
    price,
    description,
    imgPath
  } = req.body;
  if (
    product_id == null ||
    p_name == null ||
    weight == null ||
    quantity == null ||
    price == null ||
    description == null ||
    imgPath == null
  ) {
    return res.status(400).send({
      error: "Bad Request Var empty"
    });
  }
  const sql = `UPDATE product SET p_name = '${p_name}', weight = ${weight}, quantity = ${quantity}, price = ${price}, product.description = '${description}', imgPath = '${imgPath}' WHERE product_id = ${product_id}`;
  pool.query(sql, (error, results) => {
    if (error)
      return res.status(400).send({
        error: "Bad Request, Possible duplicate names and type"
      });
    res.sendStatus(200);
  });
});

// @router DELETE "/delete/:product_id"
// @desc Delete a product with the product_id
// @access private
router.delete("/delete/:product_id", (req, res) => {
  const { product_id } = req.params;
  if (product_id == null) {
    return res.status(400).send({
      error: "Bad Request"
    });
  }
  const sql = `DELETE FROM product WHERE product_id = ${product_id}`;
  pool.query(sql, (error, results) => {
    if (error)
      return res.status(400).send({
        error: "Bad Request"
      });
    res.sendStatus(200);
  });
});

export default router;
