import express from "express";
const router = express.Router();
import pool from "../db";
import {
  authenticationRequired,
  adminAuthenticationRequired
} from "../AuthenticationMiddleware/AuthenticationMiddleware";

//  @router POST /api/cart/add
//  @desc   Add items to cartItems
//  @access private
router.post("/add", authenticationRequired, (req, res) => {
  const { cartId, productId, quantity } = req.body;
  const sql = `CALL addItemsToCart(${cartId}, ${productId}, ${quantity})`;
  pool.query(sql, (err, results) => {
    if (err) return res.status(400).send({ error: "Bad Request" });
    const nestedSQL = `SELECT product_id, quantity FROM cart_item 
                WHERE cart_id = ${cartId} AND product_id = ${productId}`;
    pool.query(nestedSQL, (err, results) => {
      const quantity = results[0].quantity;
      const product = results[0].product_id;
      if (product === null) {
        return res
          .status(404)
          .json({ error: "Fail to add product: Product Not Found" });
      }
      return res.json({ product, quantity });
    });
  });
});

// @router GET /api/cart/all/:cartId
// @desc GET all items in cart
// @access private
router.get("/all/:cartId", authenticationRequired, (req, res) => {
  const { cartId } = req.params;
  const sql = `SELECT cart_id, product_id, quantity FROM cart_item WHERE cart_id = ${cartId} GROUP BY product_id`;
  pool.query(sql, (err, results) => {
    if (err) return res.send({ error: err });
    getAllProductsName(res, results);
  });
});

// async function for fetching all products name
async function getAllProductsName(res, outerSqlResults) {
  var resObj = [];

  try {
    for (var i = 0; i < outerSqlResults.length; i++) {
      const nestedSQL = `SELECT p_name, weight, price FROM product WHERE product_id = ${
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
        weight: result[0].weight,
        price: result[0].price,
        quantity: outerSqlResult.quantity
      });
    });
  });
}

//  @router DELETE /api/cart/remove
//  @desc   Remove all items with the same product id from cart
//  @access private
router.post("/remove", authenticationRequired, (req, res) => {
  const { cartId, productId } = req.body;
  console.log(cartId, productId);
  const sql = `CALL removeAllItemsFromCart(${cartId}, ${productId})`;
  pool.query(sql, (err, results) => {
    if (err)
      return res.send({ error: "Bad request: Cannot delete item from cart" });
    res.sendStatus(200);
  });
});

export default router;
