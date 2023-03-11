const inquirer = require("inquirer");
const q = [
  {
    type: "list",
    name: "viewAll",
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

const allEmployees = function () {
  console.log("viewing all employees...");
};

const addEmployee = function () {
  console.log("adding an employee...");
};

const updateEmployee = function () {
  console.log("updating an employee...");
};

const viewRoles = function () {
  console.log("viewing all roles...");
};

const addRole = function () {
  console.log("adding a role...");
};

const viewDepartments = function () {
  console.log("viewing all departments...");
};

const addDepartment = function () {
  console.log("adding a department...");
};
