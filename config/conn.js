const mysql = require("mysql2");
require("dotenv").config();

const conn = mysql.createConnection(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = conn;
