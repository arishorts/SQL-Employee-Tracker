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

const mainInq = async function () {
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
        "Exit",
      ],
    },
  ];

  const answers = await inquirer.prompt(q);
  switch (answers.viewAll) {
    case "View All Employees":
      viewAllEmployees();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Update Employee Role":
      updateEmployee();
      break;
    case "View All Roles":
      viewRoles();
      break;
    case "Add Role":
      addRole();
      break;
    case "View All Departments":
      viewDepartments();
      break;
    case "Add Department":
      addDepartment();
      break;
    case "Exit":
      // close the MySQL connection
      connection.end((err) => {
        if (err) {
          console.error("Error closing MySQL connection: " + err);
          return;
        }
        console.log("Database connection closed. Program exited.");
      });
      return;
  }
  await mainInq();
};

const getDepartments = async function () {
  var sql = `SELECT * FROM department`;
  return new Promise((res, rej) => {
    connection.query(sql, (err, result) => {
      if (err) rej(err);
      res(result);
    });
  });
};

const getRoles = async function () {
  var sql = `SELECT 
    r.id,
    r.title,
    r.salary,
    d.name
    FROM role r
    JOIN department d
    ON r.department_id = d.id`;
  return new Promise((res, rej) => {
    connection.query(sql, (err, result) => {
      if (err) rej(err);
      res(result);
    });
  });
};

const getEmployees = async function () {
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
  return new Promise((res, rej) => {
    connection.query(sql, (err, result) => {
      if (err) rej(err);
      res(result);
    });
  });
};

const viewAllEmployees = async function () {
  const result = await getEmployees();
  console.log("\n");
  console.table(result);
};

const viewRoles = async function () {
  const result = await getRoles();
  console.log("\n");
  console.table(result);
};

const viewDepartments = async function () {
  const result = await getDepartments();
  console.log("\n");
  console.table(result);
};

const addEmployee = async function () {
  const roles = await getRoles();
  const employees = await getEmployees();
  const q = [
    {
      type: "input",
      name: "first",
      message: "What is their first name?",
    },
    {
      type: "input",
      name: "last",
      message: "What is their last name?",
    },
    {
      type: "list",
      name: "manager",
      message: "Who is their manager?",
      choices: employees.map(
        (employee) => `${employee.first_name} ${employee.last_name}`
      ),
    },
    {
      type: "list",
      name: "role",
      message: "What is their role?",
      choices: roles.map((role) => role.title),
    },
  ];
  const answers = await inquirer.prompt(q);
  // const indexEmployee = employees.findIndex(
  //   (obj) => obj.first_name == answers.first
  // );
  managerName = answers.manager.split(" ");
  const indexManager = employees.findIndex(
    (obj) => obj.first_name == managerName[0] && obj.last_name == managerName[1]
  );
  const indexRoles = roles.findIndex((obj) => obj.title == answers.role);
  var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('${answers.first}','${answers.last}',${roles[indexRoles].id},${employees[indexManager].id});`;
  return new Promise((res, rej) => {
    connection.query(sql, (err, result) => {
      if (err) rej(err);
      res(result);
    });
  });
};

const addRole = async function () {
  const departments = await getDepartments();
  const q = [
    {
      type: "input",
      name: "title",
      message: "What is the role title?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the role salary?",
    },
    {
      type: "list",
      name: "department",
      message: "What department are they in?",
      choices: departments.map((department) => department.name),
    },
  ];
  const answers = await inquirer.prompt(q);
  const index = departments.findIndex((obj) => obj.name == answers.department);
  var sql = `INSERT INTO role (title, salary, department_id)
  VALUES ('${answers.title}',${answers.salary}, ${departments[index].id});`;
  return new Promise((res, rej) => {
    connection.query(sql, (err, result) => {
      if (err) rej(err);
      res(result);
    });
  });
};

const addDepartment = async function () {
  const q = [
    {
      type: "input",
      name: "department",
      message: "What is the department title?",
    },
  ];
  const answers = await inquirer.prompt(q);
  var sql = `INSERT INTO department (name)
  VALUES ('${answers.department}');`;
  return new Promise((res, rej) => {
    connection.query(sql, (err, result) => {
      if (err) rej(err);
      res(result);
    });
  });
};

const updateEmployee = function () {
  console.log("updating an employee...");
};

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// connection.end();

console.log(`
███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████ 
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██      
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████   
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██      
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████ 
                                                                     `);
console.log(`
██████  ███████ ███    ██ ███████ ██████   █████  ████████  ██████  ██████  
██       ██      ████   ██ ██      ██   ██ ██   ██    ██    ██    ██ ██   ██ 
██   ███ █████   ██ ██  ██ █████   ██████  ███████    ██    ██    ██ ██████  
██    ██ ██      ██  ██ ██ ██      ██   ██ ██   ██    ██    ██    ██ ██   ██ 
 ██████  ███████ ██   ████ ███████ ██   ██ ██   ██    ██     ██████  ██   ██ 
                                                                             `);
mainInq();
