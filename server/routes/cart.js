import express from "express";
const router = express.Router();
import connection from "../db";

// TODO: Cart route should be protected

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

//  @router POST /api/cart/add
//  @desc   Add items to cartItems
//  @access private
router.post("/add", (req, res) => {
  const { cartId, productId, quantity } = req.body;
  const sql = `CALL addItemsToCart(${cartId}, ${productId}, ${quantity})`;
  connection.query(sql, (err, results) => {
    if (err) return res.send(err);
    res.json({ success: true });
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
