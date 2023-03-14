DROP DATABASE IF EXISTS SQL_STORE ;
CREATE DATABASE IF NOT EXISTS SQL_STORE;
USE SQL_STORE;
DROP TABLE IF EXISTS department ;
DROP TABLE IF EXISTS role ;
DROP TABLE IF EXISTS employee ;
CREATE TABLE IF NOT EXISTS department 
(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30)
);
INSERT INTO department (name)
VALUES
("Engineering"),
('Finance'),
('Legal'),
('Sales');
CREATE TABLE IF NOT EXISTS role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT
);
INSERT INTO role (title, salary, department_id)
VALUES
('Lead Engineer',95000, 1),
('Software Engineer',100000, 1),
('Legal Team Lead',95000, 2),
('Lawyer',100000, 2),
('Account Manager',80000, 3),
('Accountant',72000, 3),
('Sales Lead',80000, 4),
('Salesperson',72000, 4);
CREATE TABLE IF NOT EXISTS employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tolkien','Black', 1, null),
('Jimbo','Kern', 2, 1),
('Eric','Cartman', 3, null),
('Stan','Marsh', 4, 3),
('Kyle','Broflovski', 5, null),
('Kenny','McCormick', 6, 5),
('Butters','Stotch',7, null),
('Big','Al', 8, 7);

-- USE sql_store;
-- SELECT 
-- e.id,
-- e.first_name,
-- e.last_name,
-- r.title,
-- d.name,
-- r.salary,
-- m.first_name AS manager  
-- FROM employee e
-- JOIN role r
-- ON e.role_id = r.id
-- JOIN department d
-- ON d.id = r.department_id
-- JOIN employee m
-- ON e.manager_id = m.id