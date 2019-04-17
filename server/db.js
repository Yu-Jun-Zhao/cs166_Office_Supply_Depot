import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "1234@bcd",
  database: "osd",
  port: 3306
});

export default connection;
