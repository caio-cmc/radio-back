const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "MyRadio",
  database: "MyRadio",
  port: "5505"
});

module.exports = connection;