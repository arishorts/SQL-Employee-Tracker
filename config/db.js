const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

connection.connect();

// // Read the schema file
// const schema = fs.readFileSync("./config/generate_sql_db.sql", "utf8");

// // Execute the schema as a query
// connection.query(schema);

module.exports = {
  connection: connection,
};
