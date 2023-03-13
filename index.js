//START WITH 'mysql -u root -p'

const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Role = require("./lib/role");
const Department = require("./lib/department");
const { connection } = require("./config/db");
require("console.table");
// const express = require("express");

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//https://www.npmjs.com/package/dotenv
//https://www.youtube.com/watch?v=344Zv2m9TYI&ab_channel=TheFullStackJunkie

const roleObj = new Role();
const departmentObj = new Department();
const employeeObj = new Employee();

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
      await viewAllEmployees();
      break;
    case "Add Employee":
      await addEmployee();
      break;
    case "Update Employee Role":
      await updateEmployee();
      break;
    case "View All Roles":
      await viewRoles();
      break;
    case "Add Role":
      await addRole();
      break;
    case "View All Departments":
      await viewDepartments();
      break;
    case "Add Department":
      await addDepartment();
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
  console.log("\n");
  await mainInq();
};

const viewAllEmployees = async function () {
  const result = await employeeObj.getEmployees();
  console.table(result);
};

const viewRoles = async function () {
  const result = await roleObj.getRoles();
  console.table(result);
};

const viewDepartments = async function () {
  const result = await departmentObj.getDepartments();
  console.table(result);
};

const addEmployee = async function () {
  const roles = await roleObj.getRoles();
  const employees = await employeeObj.getEmployees();
  employeesArray = employees.map(
    (employee) => `${employee.first_name} ${employee.last_name}`
  );

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
      choices: [...employeesArray, "null"],
    },
    {
      type: "list",
      name: "role",
      message: "What is their role?",
      choices: roles.map((role) => role.title),
    },
  ];

  const { first, last, manager, role } = await inquirer.prompt(q);
  const employee = new Employee(first, last, manager, role);
  return new Promise((resolve, reject) => {
    employee
      .addEmployee()
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

const addRole = async function () {
  const departments = await departmentObj.getDepartments();
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
  const { title, salary, department } = await inquirer.prompt(q);
  const role = new Role(title, salary, department);
  return new Promise((resolve, reject) => {
    role
      .addRole()
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

const addDepartment = async function () {
  const q = [
    {
      type: "input",
      name: "department_name",
      message: "What is the department title?",
    },
  ];
  const { department_name } = await inquirer.prompt(q);
  const department = new Department(department_name);
  return new Promise((resolve, reject) => {
    department
      .addDepartment()
      .then(() => resolve())
      .catch((error) => reject(error));
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
