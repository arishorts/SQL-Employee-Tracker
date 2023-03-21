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
    //Query that joins employees with their managers based on the assigned manager ID
    var sql = `SELECT 
      e.id,
      e.first_name,
      e.last_name,
      r.title,
      d.name AS department_name,
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

  async getEmployeeManager(employee_name) {
    //Query that joins employees with their managers based on the assigned manager ID
    var sql = `USE sql_store;
    SELECT e2.id as manager_id
    FROM employee e1
    JOIN employee e2 ON e1.manager_id = e2.id
    WHERE CONCAT(e1.first_name, ' ', e1.last_name) = '${employee_name}';`;
    return new Promise((res, rej) => {
      connection.query(sql, (err, result) => {
        if (err) rej(err);
        let { manager_id } = result[1][0];
        res(manager_id);
      });
    });
  }

  async addEmployee() {
    const roles = await this.getRoles();
    let indexRoles = roles.findIndex((obj) => obj.title == this.role);
    const employees = await this.getEmployees();
    employeesArray = employees.map(
      (employee) => `${employee.first_name} ${employee.last_name}`
    );
    let sql = ``;
    //Check if the manager is someone
    if (this.manager !== "null") {
      let manager_id = await this.getEmployeeManager(this.manager);
      sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${this.first_name}','${this.last_name}',${roles[indexRoles].id},'${
        manager_id + 1
      }');`;
    }
    //Otherwise, if manager is null
    else {
      sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${this.first_name}','${this.last_name}',${roles[indexRoles].id},${this.manager});`;
    }
    return new Promise((res, rej) => {
      connection.query(sql, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  async updateEmployeeRole(employee, role) {
    const roles = await this.getRoles();
    const rolesIndex = roles.findIndex((obj) => obj.title == role);
    let employeeName = employee.split(" ");
    const employees = await this.getEmployees();
    let indexEmployee = employees.findIndex(
      (obj) =>
        obj.first_name == employeeName[0] && obj.last_name == employeeName[1]
    );
    var sql = `
    UPDATE employee
    SET role_id = '${roles[rolesIndex].id}'
    WHERE id = ${employees[indexEmployee].id};`;
    return new Promise((res, rej) => {
      connection.query(sql, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }
}

module.exports = Employee;
