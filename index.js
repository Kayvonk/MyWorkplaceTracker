const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db',
});

const start = () => {
    inquirer
        .prompt({
            name: 'start',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all employees', 'View all employees by department', 'Add employee', 'Remove employee', 'View roles', 'Add role', 'Remove role', 'View managers', 'Add manager', 'Remove manager', 'View departments', 'Add department', 'Remove department', 'Update employee role', 'Update employee manager'],
        })
        .then((answer) => {
            if (answer.start === 'View all employees') {
                viewAllEmployees();
            } else if (answer.start === 'View all employees by department') {
                employeesByDeptartment();
            } else if (answer.start === 'Add employee') {
                addEmployee();
            } else if (answer.start === 'Remove employee') {
                removeEmployee();
            } else if (answer.start === 'Update employee role') {
                updateEmployeeRole();
            } else if (answer.start === 'Update employee manager') {
                updateEmployeeManager();
            } else if (answer.start === 'View roles') {
                viewRoles();
            } else if (answer.start === 'Add role') {
                addRole();
            } else if (answer.start === 'Remove role') {
                removeRole();
            } else if (answer.start === 'View managers') {
                viewManagers();
            } else if (answer.start === 'Add manager') {
                addManager();
            } else if (answer.start === 'Remove manager') {
                removeManager();
            } else if (answer.start === 'View departments') {
                viewDepartments();
            } else if (answer.start === 'Add department') {
                addDepartment();
            } else if (answer.start === 'Remove department') {
                removeDepartment();
            } else {
                connection.end();
            }
        })
};

const viewAllEmployees = () => {
    let query = 'SELECT first_name, last_name, id, manager_id FROM employees ORDER BY last_name';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Employees:', res);
        inquirer
            .prompt({
                name: 'viewAllEmployees',
                type: 'confirm',
                message: 'Would you like to return to the main menu.',
            })
            .then((answer) => {
                if (answer.viewAllEmployees) {
                    start();
                } else {
                    connection.end();
                }
            })
    })
};

const employeesByDeptartment = () => {
    let query = 'SELECT departments.department_name, roles.title, employees.first_name, employees.last_name FROM departments RIGHT JOIN roles ON roles.department_id = departments.id INNER JOIN employees ON roles.id = employees.role_id ORDER BY department_name ';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('Employee by Departments:', res);
        inquirer
            .prompt({
                name: 'employeesByDeptartment',
                type: 'confirm',
                message: 'Press confirm to return to the main menu.',
            })
            .then((answer) => {
                if (answer.employeesByDeptartment) {
                    start();
                } else {
                    connection.end();
                }
            })
    })
};

function addEmployee() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the first name of the employee? ",
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the last name of the employee? "
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the manager ID for the employee?"
                },
                {
                    name: 'addRole',
                    type: 'list',
                    choices: function () {
                        return res.map(role => ({ name: role.title, value: role.id }))
                    },
                    message: "What is the role of the employee?"
                }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO employees SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: answer.addRole,
                    },
                    function (err) {
                        if (err) throw err;
                        start()
                    })
            })
    })
};

const removeEmployee = () => {
    connection.query('SELECT role_id, id, CONCAT(employees.first_name, " ", employees.last_name) AS full_name FROM employees WHERE employees.role_id != 1 ORDER BY last_name', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'removeEmployee',
                type: "list",
                message: "What the name of the employee you would like to remove?",
                choices: function () {
                    if (err) throw err
                    return res.map(employee => ({ name: employee.full_name, value: employee.id }))
                }

            },
        ])
            .then(function (answer) {
                connection.query('DELETE FROM employees WHERE ?', { id: answer.removeEmployee },
                    function (err) {
                        if (err) throw err
                        start();
                    }
                )
            })
    })
};

const updateEmployeeRole = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        inquirer.prompt([
            {
                name: 'employeeID',
                type: 'input',
                message: 'What is the employee id of the employee you would like to update?',
            },
            {
                name: "updatedRole",
                type: "list",
                message: "What the updated role for this employee?",
                choices: function () {
                    if (err) throw err
                    return res.map(role => ({ name: role.title, value: role.id }))
                }

            }
        ]).then(function (answer) {
            console.log(answer.updatedRole)
            connection.query('UPDATE employees SET ? WHERE ?', [{ role_id: answer.updatedRole }, { id: answer.employeeID }],
                function (err) {
                    if (err) throw err
                    start();
                }
            )
        })
    })
};

const updateEmployeeManager = () => {
    connection.query('SELECT role_id, id, CONCAT(employees.first_name, " ", employees.last_name) AS full_name FROM employees', function (err, res) {
        inquirer.prompt([
            {
                name: 'employeeID',
                type: 'list',
                message: 'Who is the employee you would like to update?',
                choices: function () {
                    if (err) throw err
                    return res.map(employee => ({ name: employee.full_name, value: employee.id }))
                }
            },
            {
                name: "updatedManager",
                type: "list",
                message: "Who is the updated manager?",
                choices: function () {
                    if (err) throw err
                    return res.filter(employee => employee.role_id === 1).map(employee => ({ name: employee.full_name, value: employee.id }))
                }
            }

        ]).then(function (answer) {
            console.log(answer.updatedManager)
            connection.query('UPDATE employees SET ? WHERE ?', [{ manager_id: answer.updatedManager }, { id: answer.employeeID }],
                function (err) {
                    if (err) throw err
                    start();
                }
            )
        })
    })
};

const viewRoles = () => {
    let query = 'SELECT DISTINCT title, salary FROM roles';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('View Roles:', res);
        inquirer
            .prompt({
                name: 'viewRoles',
                type: 'confirm',
                message: 'Would you like to return to the main menu.',
            })
            .then((answer) => {
                if (answer.viewRoles) {
                    start();
                } else {
                    connection.end();
                }
            })
    })
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'addRole',
                type: 'input',
                message: 'What is the name of the new role?',
            },
            {
                name: 'addSalary',
                type: 'input',
                message: 'What is the salary for this role?',
            },
        ])
        .then(function (answer) {
            connection.query('INSERT INTO roles SET ?',
                {
                    title: answer.addRole,
                    salary: answer.addSalary,
                },
                function (err) {
                    if (err) throw err
                    start();
                }
            )
        })
};

const removeRole = () => {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        inquirer.prompt({
            name: 'removeRole',
            type: 'list',
            message: 'Which role would you like to remove?',
            choices: function () {
                return res.map(role => ({ name: role.title, value: role.id }))
            },

        })
            .then(function (answer) {
                connection.query('DELETE FROM roles WHERE ?', { id: answer.removeRole },
                    function (err) {
                        if (err) throw err
                        start();
                    }
                )
            })
    })
};

const viewManagers = () => {
    let query = 'SELECT employees.id, employees.first_name, employees.last_name FROM  employees where employees.role_id = 1';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('View managers:', res);
        inquirer
            .prompt({
                name: 'viewManagers',
                type: 'confirm',
                message: 'Would you like to return to the main menu.',
            })
            .then((answer) => {
                if (answer.viewManagers) {
                    start();
                } else {
                    connection.end();
                }
            })
    })
};

const addManager = () => {
    inquirer.prompt([
        {
            name: 'managerFirst_name',
            type: 'input',
            message: 'What is the first name of the manager?'
        },
        {
            name: 'managerLast_name',
            type: 'input',
            message: 'What is the last name of the manager?'
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO employees SET ?',
            {
                first_name: answer.managerFirst_name,
                last_name: answer.managerLast_name,
                manager_id: null,
                role_id: 1,
            },
            function (err) {
                if (err) throw err;
                start()
            })
    })
};

const removeManager = () => {
    let query = 'SELECT id, CONCAT(employees.first_name, " ", employees.last_name) AS full_name FROM  employees where employees.role_id = 1';
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'removeManager',
                type: 'list',
                message: 'What is the name of the manager you would like to remove?',
                choices: function () {
                    if (err) throw err
                    return res.map(manager => ({ name: manager.full_name, value: manager.id }))
                }
            },
        ])
            .then(function (answer) {
                connection.query('DELETE FROM employees WHERE ?', { id: answer.removeManager },
                    function (err) {
                        if (err) throw err
                        start();
                    }
                )
            })
    })
};

const viewDepartments = () => {
    let query = 'SELECT * FROM departments';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('View Departments:', res);
        inquirer
            .prompt({
                name: 'viewDepartments',
                type: 'confirm',
                message: 'Would you like to return to the main menu.',
            })
            .then((answer) => {
                if (answer.viewDepartments) {
                    start();
                } else {
                    connection.end();
                }
            })
    })
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'addDepartment',
            type: 'input',
            message: 'Please input the department that you would like to add.'
        })
        .then((answer) => {
            connection.query(
                'INSERT INTO departments SET ?',
                {
                    department_name: answer.addDepartment,
                },
                function (err) {
                    if (err) throw err;
                    start()
                })
        })
};

const removeDepartment = () => {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        inquirer.prompt({
            name: 'removeDepartment',
            type: 'list',
            message: 'Which department would you like to remove?',
            choices: function () {
                return res.map(department => ({ name: department.department_name, value: department.id }))
            }
        })
            .then(function (answer) {
                connection.query('DELETE FROM departments WHERE ?', { id: answer.removeDepartment },
                    function (err) {
                        if (err) throw err
                        start();
                    }
                )
            })
    })
};

start();