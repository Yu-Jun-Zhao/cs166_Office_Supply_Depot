import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "user",
  password: "1234@bcd",
  database: "osd",
  port: 3306
});

export default pool;
