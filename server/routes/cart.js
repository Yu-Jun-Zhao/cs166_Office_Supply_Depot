import express from "express";
const router = express.Router();
import pool from "../db";

//  @router POST /api/cart/add
//  @desc   Add items to cartItems
//  @access private
router.post("/add", (req, res) => {
  const { cartId, productId, quantity } = req.body;
  const sql = `CALL addItemsToCart(${cartId}, ${productId}, ${quantity})`;
  pool.query(sql, (err, results) => {
    if (err) return res.send({ error: "Fail to add items to cart" });
    const nestedSQL = `SELECT product_id, COUNT(*) AS quantity FROM cart_item WHERE cart_id = ${cartId} AND product_id = ${productId}`;
    pool.query(nestedSQL, (err, results) => {
      const quantity = results[0].quantity;
      const product = results[0].product_id;
      return res.json({ product, quantity });
    });
  });
});

// @router GET /api/cart/all
// @desc GET all items in cart
// @access private

router.get("/all", (req, res) => {
  const { cartId } = req.body;
  const sql = `SELECT cart_id, product_id, COUNT(*) AS quantity FROM cart_item WHERE cart_id = ${cartId} GROUP BY product_id`;
  pool.query(sql, (err, results) => {
    if (err) return res.send({ error: "Cannot fetch items from cart" });
    getAllProductsName(res, results);
  });
});

// async function for fetching all products name
async function getAllProductsName(res, outerSqlResults) {
  var resObj = [];

  try {
    for (var i = 0; i < outerSqlResults.length; i++) {
      const nestedSQL = `SELECT p_name FROM product WHERE product_id = ${
        outerSqlResults[i].product_id
      }`;
      const productObj = await getProduct(nestedSQL, outerSqlResults[i]);
      resObj.push(productObj);
    }
  } catch (err) {
    resObj = [];
  } finally {
    res.send({ cart: resObj });
  }
}

// Create the promise for fetching query
function getProduct(query, outerSqlResult) {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject({ error: "Cannot fetch this product info" });
      resolve({
        id: outerSqlResult.product_id,
        name: result[0].p_name,
        quantity: outerSqlResult.quantity
      });
    });
  });
}

/*
router.get("/all", (req, res) => {
  const { cartId } = req.body;
  const sql = `SELECT cart_id, product_id, COUNT(*) AS quantity FROM cart_item WHERE cart_id = ${cartId} GROUP BY product_id`;
  pool.query(sql, (err, results) => {
    if (err) res.send({ error: "Cannot fetch items from cart" });

    return res.send({ cart: results });
  });
});
*/

//  @router DELETE /api/cart/
//  @desc   Remove all items with the same product id from cart
//  @access private
router.delete("/remove", (req, res) => {
  const { cartId, productId } = req.body;
  const sql = `CALL removeAllItemsFromCart(${cartId}, ${productId})`;
  pool.query(sql, (err, results) => {
    if (err) return res.send(err);
    res.json({ success: true }); //for now
  });
});

export default router;
