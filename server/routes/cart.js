import express from "express";
const router = express.Router();
import connection from "../db";

// TODO: Cart route should be protected

/*
// @router GET /api/cart/
// @desc   Retrieve the cartId
// @access private
// @return {cart_id: #}
router.get("/", (req, res) => {
  const { userId } = req.body;
  const sql = `SELECT cart_id FROM cart WHERE user_id = "${userId}"`;
  connection.query(sql, (err, results) => {
    if (err) res.send(err);
    res.json(results);
  });
});
*/

//  @router POST /api/cart/add
//  @desc   Add items to cartItems
//  @access private
router.post("/add", (req, res) => {
  const { cartId, productId, quantity } = req.body;
  const sql = `CALL addItemsToCart(${cartId}, ${productId}, ${quantity})`;
  connection.query(sql, (err, results) => {
    if (err) return res.send({ error: "Fail to add items to cart" });
    const nestedSQL = `SELECT product_id, COUNT(*) AS quantity FROM cart_item WHERE cart_id = ${cartId} AND product_id = ${productId}`;
    connection.query(nestedSQL, (err, results) => {
      const quantity = results[0].quantity;
      const product = results[0].product_id;
      return res.json({ product, quantity });
    });
  });
});

// @router GET /api/cart/all
// @desc GET all items in cart
// @access private
/*
router.get("/all", (req, res) => {
  const { cartId } = req.body;
  const sql = `SELECT cart_id, product_id, COUNT(*) AS quantity FROM cart_item WHERE cart_id = ${cartId} GROUP BY product_id`;
  connection.query(sql, (err, results) => {
    if (err) res.send({ error: "Cannot fetch items from cart" });
    const resObj = [];
    for (var i = 0; i < results.length; i++) {
      const nestedSQL = `SELECT p_name FROM product WHERE product_id = ${
        results[i].product_id
      }`;
      connection.query(nestedSQL, (err, res) => {
        if (err) return res.send({ error: "Cannot fetch this product info" });
        resObj.push({
          name: res.p_name,
          quantity: results.quantity
        });
      });
    }
    return res.send({ resObj });
  });
});
*/

router.get("/all", (req, res) => {
  const { cartId } = req.body;
  const sql = `SELECT cart_id, product_id, COUNT(*) AS quantity FROM cart_item WHERE cart_id = ${cartId} GROUP BY product_id`;
  connection.query(sql, (err, results) => {
    if (err) res.send({ error: "Cannot fetch items from cart" });

    return res.send({ cart: results });
  });
});

//  @router DELETE /api/cart/
//  @desc   Remove all items with the same product id from cart
//  @access private
router.delete("/remove", (req, res) => {
  const { cartId, productId } = req.body;
  const sql = `CALL removeAllItemsFromCart(${cartId}, ${productId})`;
  connection.query(sql, (err, results) => {
    if (err) return res.send(err);
    res.json({ success: true }); //for now
  });
});

export default router;
