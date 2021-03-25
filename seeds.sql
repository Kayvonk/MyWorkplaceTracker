/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employees_db;

/* Insert 3 Rows into your new table */
INSERT INTO departments (department_name)
VALUES ("Accounting"), ("Sales"), ("Legal"), ("Software Development");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 10000, 1), ("Manager", 20000, 2), ("Manager", 30000, 3), ("Manager", 40000, 4), ("Accountant", 20000, 1), ("Sales Lead", 25000, 2), ("Sales Person", 22000, 2), ("Attorney", 40000, 3), ("Junior Developer", 100, 4), ("Lead Engineer", 500, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Shmoe", 5, 2), ("Cindy", "Lu", 1, null),  ("Jon", "Snow", 6, 4), ("Boop", "Beep", 2, null ), ("Joseph", "Joestar", 8, 6 ), ("Dio", "Brando", 3, null ), ("Rei", "Ayanami", 9, 9 ), ("Shinji", "Ikari", 10, 9 ), ("Asuka", "Langley", 4 , null );

