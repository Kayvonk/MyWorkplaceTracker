/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employees_db;

/* Insert 3 Rows into your new table */
INSERT INTO departments (department_name)
VALUES ("Management"), ("Accounting"), ("Sales"), ("Legal"), ("Software Development");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 50000, 1), ("Accountant", 20000, 2), ("Sales Lead", 25000, 3), ("Sales Person", 22000, 3), ("Attorney", 40000, 4), ("Junior Developer", 100, 5), ("Lead Engineer", 500, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Shmoe", 2, 2), ("Cindy", "Lu", 1, null),  ("Jon", "Snow", 3, 4), ("Boop", "Beep", 1, null ), ("Joseph", "Joestar", 5, 6 ), ("Dio", "Brando", 1, null ), ("Rei", "Ayanami", 6, 9 ), ("Shinji", "Ikari", 7, 9 ), ("Asuka", "Langley", 1 , null );

