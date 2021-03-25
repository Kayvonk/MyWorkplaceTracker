const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
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
            } else if (answer.start === 'Add managers') {
                addManager();
            } else if (answer.start === 'Remove managers') {
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
        });
};

const viewAllEmployees = () => {
    let query = 'SELECT first_name, last_name FROM employees ORDER BY last_name';
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
    });
}
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
    });
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
                        var roleArr = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArr.push(res[i].title);
                        }
                        return roleArr;
                    },
                    message: "What is the role of the employee?"
                }
            ]).then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.addRole) {
                        role_id = res[a].id;
                    }
                }
                connection.query(
                    'INSERT INTO employees SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        start()
                    })
            })
    })
};


const removeEmployee = () => {
    inquirer
        .prompt({
            name: 'removeEmployee',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.removeEmployee === '') {

            } else if (answer.removeEmployee === '') {

            } else {
                connection.end();
            }
        })
};
const updateEmployeeRole = () => {
    inquirer
        .prompt({
            name: 'updateEmployeeRole',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.updateEmployeeRole === '') {

            } else if (answer.updateEmployeeRole === '') {

            } else {
                connection.end();
            }
        })
};
const updateEmployeeManager = () => {
    inquirer
        .prompt({
            name: 'updateEmployeeManager',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.employeeRole === '') {

            } else if (answer.employeeRole === '') {

            } else {
                connection.end();
            }
        })
};
const viewRoles = () => {
    let query = 'SELECT DISTINCT title FROM roles';
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
        .prompt({
            name: 'addRole',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.employeeRole === '') {

            } else if (answer.employeeRole === '') {

            } else {
                connection.end();
            }
        })
};
const removeRole = () => {
    inquirer
        .prompt({
            name: 'removeRole',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.removeRole === '') {

            } else if (answer.removeRole === '') {

            } else {
                connection.end();
            }
        })
};
const viewManagers = () => {
    let query = "SELECT DISTINCT departments.department_name, roles.department_id, employees.first_name, employees.last_name FROM departments RIGHT JOIN roles ON departments.id = roles.department_id INNER JOIN employees On departments.id= employees.role_id where employees.manager_id IS NULL";
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
    inquirer
        .prompt({
            name: 'addManager',
            type: 'input',
            message: 'Please input the Manager that you would like to add.'
        })
        .then((answer) => {
            if (answer.addManager === '') {

            } else if (answer.addManager === '') {

            } else {
                connection.end();
            }
        })
};
const removeManager = () => {
    inquirer
        .prompt({
            name: 'removeManager',
            type: 'list',
            message: 'Which manager would you like to remove?',
            choices: ['Accounting', 'Sales', 'Legal'],
        })
        .then((answer) => {
            if (answer.removeManager === '') {

            } else if (answer.removeManager === '') {

            } else {
                connection.end();
            }
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
            if (answer.addDepartment === '') {

            } else if (answer.addDepartment === '') {

            } else {
                connection.end();
            }
        })
};
const removeDepartment = () => {
    inquirer
        .prompt({
            name: 'removeDepartment',
            type: 'list',
            message: 'Which department would you like to remove?',
            choices: ['Accounting', 'Sales', 'Legal'],
        })
        .then((answer) => {
            if (answer.removeDepartment === '') {

            } else if (answer.removeDepartment === '') {

            } else {
                connection.end();
            }
        })
};

start();
// ----------------------------------------------------------------------------------------------------------------------

// add/remove roles or employees from tables based on responses

// INSERT INTO employees(first_name, last_name) values('Jon', 'Snow')

// DELETE FROM employees
// WHERE id = 4