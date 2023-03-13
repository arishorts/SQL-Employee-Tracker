const { connection } = require("../config/db");

class Department {
  constructor(name) {
    this.name = name;
  }
  getDepartment() {
    return this.name;
  }

  async getDepartments() {
    var sql = `SELECT * FROM department`;
    return new Promise((res, rej) => {
      connection.query(sql, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }

  async addDepartment() {
    var sql = `INSERT INTO department (name)
    VALUES ('${this.name}');`;
    return new Promise((res, rej) => {
      connection.query(sql, (err, result) => {
        if (err) rej(err);
        res(result);
      });
    });
  }
}

module.exports = Department;
