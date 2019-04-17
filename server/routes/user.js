import express from "express";
const router = express.Router();
import connection from "../db";

// @router PUT api/user/
// @desc   Store user information to MySql database
// @access Private TODO
router.put("/", (req, res) => {
  const { userId, firstName, lastName } = req.body;

  const sql = `INSERT INTO customer(user_id, first_name, last_name) VALUES('${userId}', '${firstName}', '${lastName}')
                ON DUPLICATE KEY UPDATE user_id = user_id`;

  connection.query(sql, (error, results) => {
    if (error) res.send(error);
    res.json(results);
  });
});

export default router;
