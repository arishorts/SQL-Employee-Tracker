const mysql = require("mysql2");
const fs = require("fs");
// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

// Read the schema file
const schema = fs.readFileSync("./config/generate_sql_db.sql", "utf8");

// Execute the schema as a query
connection.query(schema, (error, results, fields) => {
  if (error) {
    console.error(error);
    return;
  }
  // console.log("Schema has been executed successfully");
  // console.log(results);
});

module.exports = {
  connection: connection,
};
