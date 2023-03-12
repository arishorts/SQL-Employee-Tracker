const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
const { connection } = require("./config/db");
const cTable = require("console.table");
// const express = require("express");

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//https://www.npmjs.com/package/dotenv
//https://www.youtube.com/watch?v=344Zv2m9TYI&ab_channel=TheFullStackJunkie

const mainInq = function () {
  const q = [
    {
      type: "list",
      name: "viewAll",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    },
  ];

  inquirer
    .prompt(q)
    .then((answers) => {
      switch (answers.viewAll) {
        case "View All Employees":
          return allEmployees();
        case "Add Employee":
          return addEmployee();
        case "Update Employee Role":
          return updateEmployee();
        case "View All Roles":
          return viewRoles();
        case "Add Role":
          return addRole();
        case "View All Departments":
          return viewDepartments();
        case "Add Department":
          return addDepartment();
      }
    })
    .catch((err) => {
      if (err.isTtyError) {
        //Prompt couldnt be rendered
      } else {
        //Something else went wrong
      }
    });
};

const allEmployees = function () {
  connection.connect(function (err) {
    if (err) throw err;
    var sql = `SELECT 
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    d.name,
    r.salary,
    m.first_name AS manager  
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON e.manager_id = m.id`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("\n");
      console.table(result);
      mainInq();
    });
  });
  mainInq();
};

const addEmployee = function () {
  console.log("adding an employee...");
  mainInq();
};

const updateEmployee = function () {
  console.log("updating an employee...");
  mainInq();
};

const viewRoles = function () {
  connection.connect(function (err) {
    if (err) throw err;
    var sql = `SELECT 
    r.id,
    r.title,
    r.salary,
    d.name
    FROM role r
    JOIN department d
    ON r.department_id = d.id`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("\n");
      console.table(result);
      mainInq();
    });
  });
  mainInq();
};

const addRole = function () {
  console.log("adding a role...");
  mainInq();
};

const viewDepartments = function () {
  connection.connect(function (err) {
    if (err) throw err;
    var sql = `SELECT * FROM department`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("\n");
      console.table(result);
      mainInq();
    });
  });
};

const addDepartment = function () {
  console.log("adding a department...");
  mainInq();
};

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// connection.end();

mainInq();
