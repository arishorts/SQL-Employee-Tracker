const { connection } = require("../config/db");
const Role = require("./role");

class Employee extends Role {
  constructor(first_name, last_name, manager, role, getRoles, getDepartments) {
    super({ getRoles, getDepartments });
    this.first_name = first_name;
    this.last_name = last_name;
    this.manager = manager;
    this.role = role;
  }
  getName() {
    return this.first_name + this.last_name;
  }
  getManager() {
    return this.manager;
  }
  getRole() {
    return this.role;
  }

  async getEmployees() {
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
  }

  async addEmployee() {
    const roles = await this.getRoles();
    const employees = await this.getEmployees();
    employeesArray = employees.map(
      (employee) => `${employee.first_name} ${employee.last_name}`
    );
    let managerName = this.manager.split(" ");
    let indexManager = employees.findIndex(
      (obj) =>
        obj.first_name == managerName[0] && obj.last_name == managerName[1]
    );
    let indexRoles = roles.findIndex((obj) => obj.title == this.role);
    var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${this.first_name}','${this.last_name}',${roles[indexRoles].id},${employees[indexManager].id});`;
    return new Promise((res, rej) => {
      connection.query(sql, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  updateEmployee() {}
}

module.exports = Employee;
