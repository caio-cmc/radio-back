const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "teste",
  database: "MyRadio",
  port: "5555"
});

module.exports = connection;