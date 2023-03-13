const { connection } = require("../config/db");
const Department = require("./department");

class Role extends Department {
  constructor(title, salary, department, getDepartments) {
    super({ getDepartments });
    this.title = title;
    this.salary = salary;
    this.department = department;
  }
  getTitle() {
    return this.title;
  }
  getsalary() {
    return this.salary;
  }
  getDepartment() {
    return this.department;
  }

  async getRoles() {
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
  }

  async addRole() {
    const departments = await this.getDepartments();
    const index = departments.findIndex((obj) => obj.name == this.department);
    var sql = `INSERT INTO role (title, salary, department_id)
    VALUES ('${this.title}',${this.salary}, ${departments[index].id});`;
    return new Promise((res, rej) => {
      connection.query(sql, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }
}

module.exports = Role;
