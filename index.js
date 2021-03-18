const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'meteor88',
    database: 'employees_db',
});

let employeeArr = [];
let departmentArr = [];
let roleArr = [];
let managerArr = [];


const start = () => {
    inquirer
        .prompt({
            name: 'start',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all employees', 'View all employees by department', 'View all employees by Manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager'],
        })
        .then((answer) => {
            if (answer.start === 'View all employees') {
                viewAllEmployees();
            } else if (answer.start === 'View all employees by department') {
                employeesByDeptartment();
            } else if (answer.start === 'View all employees by Manager') {
                employeesByManager();
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
            } else if (answer.start === 'Add roles') {
                addRole();
            } else if (answer.start === 'Remove roles') {
                removeRole();
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
    inquirer
        .prompt({
            name: 'viewAllEmployees',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.viewAllEmployees === '') {

            } else if (answer.viewAllEmployees === '') {

            } else {
                connection.end();
            }
        })
};
const employeesByDeptartment = () => {
    inquirer
        .prompt({
            name: 'employeesByDeptartment',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.employeesByDeptartment === '') {

            } else if (answer.employeesByDeptartment === '') {

            } else {
                connection.end();
            }
        })
};
const employeesByManager = () => {
    inquirer
        .prompt({
            name: 'employeesByManager',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.employeesByManager === '') {

            } else if (answer.employeesByManager === '') {

            } else {
                connection.end();
            }
        })
};
const addEmployee = () => {
    inquirer
        .prompt({
            name: 'addEmployee',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.addEmployee === '') {

            } else if (answer.addEmployee === '') {

            } else {
                connection.end();
            }
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
            if (answer.updateEmployeeManager === '') {

            } else if (answer.updateEmployeeManager === '') {

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
    inquirer
        .prompt({
            name: 'viewRoles',
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
const viewDepartments = () => {
    inquirer
        .prompt({
            name: 'viewDepartment',
            type: 'list',
            message: '',
            choices: [],
        })
        .then((answer) => {
            if (answer.viewDepartments === '') {

            } else if (answer.viewDepartments === '') {

            } else {
                connection.end();
            }
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

// const placeholder = () => {
//     inquirer
//         .prompt({
//             name: 'placeholder',
//             type: 'list',
//             message: 'placeholder?',
//             choices: ['placeholder', 'placeholder', 'placeholder'],
//         })
//         .then(() => {

//         })
//         .then(() => {



//         });
// }


    // ----------------------------------------------------------------------------------------------------------------------

// add/remove roles or employees from tables based on responses

    // INSERT INTO employees(first_name, last_name) values('Jon', 'Snow')

    // DELETE FROM employees
    // WHERE id = 4

//
