INSERT INTO department (name)
VALUES
("Engineering"),
('Finance'),
('Legal'),
('Sales');

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