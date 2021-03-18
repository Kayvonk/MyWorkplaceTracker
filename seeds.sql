/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employees_db;

/* Insert 3 Rows into your new table */
INSERT INTO departments (department_name)
VALUES ("Accounting"), ("Sales"), ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 200, 1), ("Sales Person", 400, 2), ("Lead Engineer", 500, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Shmoe", 7, 8), ("Cindy", "Lu", 5, 6), ("Boop", "Beep", 3, 4);

